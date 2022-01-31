package com.example.backend.security.fitler;

import com.example.backend.security.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

//    @Value("${security.url.login}")
//    private String loginUrl;
//
//    @Value("${security.url.signup}")
//    private String signupUrl;
//
//    @Value("${security.url.logout}")
//    private String logoutUrl;


    public static final RequestMatcher DEFAULT_JWT_MATCHER = new DefaultRequiresJwtMatcher();
    private RequestMatcher requireJwtAuthenticationMatcher = DEFAULT_JWT_MATCHER;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {


//        if(!isExclusiveUrl(request)){
//            String token = "";
//            String tokenHeader = request.getHeader("Authorization");
//
//            if(tokenHeader != null && tokenHeader.startsWith("Bearer")){
//                token = tokenHeader.substring(7);
//            }
//
//            if(token != null && jwtUtils.validateToken(token)){
//                Authentication authentication = jwtUtils.getAuthentication(token);
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }

        String token = "";
        String tokenHeader = request.getHeader("Authorization");

        if(tokenHeader != null && tokenHeader.startsWith("Bearer")){
            token = tokenHeader.substring(7);
        }

        if(token != null && jwtUtils.validateToken(token)){
            Authentication authentication = jwtUtils.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
//
//    private boolean isExclusiveUrl(HttpServletRequest request){
//        List<RequestMatcher> requestMatcher = new ArrayList<>();
//        requestMatcher.add(new AntPathRequestMatcher(loginUrl));
//        requestMatcher.add(new AntPathRequestMatcher(signupUrl));
//        requestMatcher.add(new AntPathRequestMatcher(logoutUrl));
//
//        for (RequestMatcher matcher : requestMatcher) {
//            if(matcher.matches(request)){
//                return true;
//            }
//        }
//        return false;
//    }
//
    private static final class DefaultRequiresJwtMatcher implements RequestMatcher {
        private final HashSet<String> allowedMethods = new HashSet<>(Arrays.asList("GET", "HEAD", "TRACE", "OPTIONS"));

        @Override
        public boolean matches(HttpServletRequest request) {
            return !this.allowedMethods.contains(request.getMethod());
        }

        @Override
        public String toString() {
            return "JwtNotRequired " + this.allowedMethods;
        }

    }
}

