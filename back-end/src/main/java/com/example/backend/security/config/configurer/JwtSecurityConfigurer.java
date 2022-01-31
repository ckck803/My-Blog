package com.example.backend.security.config.configurer;

import com.example.backend.security.fitler.JwtAuthenticationFilter;
import com.example.backend.security.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.AbstractRequestMatcherRegistry;
import org.springframework.security.config.annotation.web.HttpSecurityBuilder;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfLogoutHandler;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AndRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@RequiredArgsConstructor
public class JwtSecurityConfigurer <H extends HttpSecurityBuilder<H>>
        extends AbstractHttpConfigurer<JwtSecurityConfigurer<H>, H> {
    private List<RequestMatcher> ignoredJwtAuthenticationMatchers = new ArrayList<>();

    private RequestMatcher requireJwtAuthenticationMatcher = JwtAuthenticationFilter.DEFAULT_JWT_MATCHER;
    private final ApplicationContext context;
    private final JwtUtils jwtUtils;

    @Override
    public void configure(H builder) throws Exception {
//        CsrfFilter filter = new CsrfFilter(this.csrfTokenRepository);
//        RequestMatcher requireCsrfProtectionMatcher = getRequireCsrfProtectionMatcher();
//        if (requireCsrfProtectionMatcher != null) {
//            filter.setRequireCsrfProtectionMatcher(requireCsrfProtectionMatcher);
//        }
//        AccessDeniedHandler accessDeniedHandler = createAccessDeniedHandler(http);
//        if (accessDeniedHandler != null) {
//            filter.setAccessDeniedHandler(accessDeniedHandler);
//        }
//        LogoutConfigurer<H> logoutConfigurer = http.getConfigurer(LogoutConfigurer.class);
//        if (logoutConfigurer != null) {
//            logoutConfigurer.addLogoutHandler(new CsrfLogoutHandler(this.csrfTokenRepository));
//        }
//        SessionManagementConfigurer<H> sessionConfigurer = http.getConfigurer(SessionManagementConfigurer.class);
//        if (sessionConfigurer != null) {
//            sessionConfigurer.addSessionAuthenticationStrategy(getSessionAuthenticationStrategy());
//        }
//        filter = postProcess(filter);
//        http.addFilter(filter);
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtils);
        RequestMatcher requestMatcher = getRequireJwtProtectionMatcher();
        if (requestMatcher != null){
            jwtAuthenticationFilter.setRequireJwtProtectionMatcher(requireJwtAuthenticationMatcher);
        }

        builder.addFilter(jwtAuthenticationFilter);
    }

    public void setRequireJwtProtectionMatcher(RequestMatcher requireJwtProtectionMatcher) {
        Assert.notNull(requireJwtProtectionMatcher, "requireJwtProtectionMatcher cannot be null");
        this.requireJwtAuthenticationMatcher = requireJwtProtectionMatcher;
    }

    private RequestMatcher getRequireJwtProtectionMatcher() {
        if (this.ignoredJwtAuthenticationMatchers.isEmpty()) {
            return this.requireJwtAuthenticationMatcher;
        }
        return new AndRequestMatcher(this.requireJwtAuthenticationMatcher,
                new NegatedRequestMatcher(new OrRequestMatcher(this.ignoredJwtAuthenticationMatchers)));
    }

    public JwtSecurityConfigurer<H> ignoringAntMatchers(String... antPatterns) {
        IgnoreJwtAuthenticationRepository ignoreJwtAuthenticationRepository = new IgnoreJwtAuthenticationRepository(this.context);
        return ignoreJwtAuthenticationRepository.antMatchers(antPatterns).and();
    }


    private class IgnoreJwtAuthenticationRepository extends AbstractRequestMatcherRegistry<IgnoreJwtAuthenticationRepository> {

        IgnoreJwtAuthenticationRepository(ApplicationContext context) {
            setApplicationContext(context);
        }

        @Override
        public MvcMatchersIgnoreJwtAuthentication mvcMatchers(HttpMethod method, String... mvcPatterns) {
            List<MvcRequestMatcher> mvcMatchers = createMvcMatchers(method, mvcPatterns);
            JwtSecurityConfigurer.this.ignoredJwtAuthenticationMatchers.addAll(mvcMatchers);
            return new MvcMatchersIgnoreJwtAuthentication(getApplicationContext(), mvcMatchers);
        }

        @Override
        public MvcMatchersIgnoreJwtAuthentication mvcMatchers(String... mvcPatterns) {
            return mvcMatchers(null, mvcPatterns);
        }

        JwtSecurityConfigurer<H> and() {
            return JwtSecurityConfigurer.this;
        }

        @Override
        protected IgnoreJwtAuthenticationRepository chainRequestMatchers(List<RequestMatcher> requestMatchers) {
            JwtSecurityConfigurer.this.ignoredJwtAuthenticationMatchers.addAll(requestMatchers);
            return this;
        }

    }

    private final class MvcMatchersIgnoreJwtAuthentication extends IgnoreJwtAuthenticationRepository {
        private final List<MvcRequestMatcher> mvcMatchers;
        private MvcMatchersIgnoreJwtAuthentication(ApplicationContext context, List<MvcRequestMatcher> mvcMatchers) {
            super(context);
            this.mvcMatchers = mvcMatchers;
        }

        IgnoreJwtAuthenticationRepository servletPath(String servletPath) {
            for (MvcRequestMatcher matcher : this.mvcMatchers) {
                matcher.setServletPath(servletPath);
            }
            return this;
        }
    }
}
