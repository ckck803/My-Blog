package com.example.backend.security.config;


import com.example.backend.security.fitler.JsonAuthenticationFilter;
import com.example.backend.security.fitler.JwtAuthenticationFilter;
import com.example.backend.security.handler.JsonAuthenticationSuccessHandler;
import com.example.backend.security.provider.JsonAuthenticationProvider;
import com.example.backend.security.service.UserInfoUserDetailsService;
import com.example.backend.security.utils.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Order(0)
@Profile("prod")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${security.url.login}")
    private String loginUrl;

    private final ObjectMapper objectMapper;

    private final JwtUtils jwtUtils;

    private final UserInfoUserDetailsService userInfoUserDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .authenticationProvider(jsonAuthenticationProvider())
                .userDetailsService(userInfoUserDetailsService);
    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .headers().frameOptions().disable();

        http
                .authorizeRequests()
                .antMatchers("/api/home").permitAll()
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/signup").permitAll()
                .antMatchers("/logout").permitAll()
                .anyRequest().authenticated();

        http
                .logout()
                .logoutUrl("/api/logout");

        http
                .addFilterBefore(jsonAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(jsonAuthenticationFilter(), JwtAuthenticationFilter.class)
                ;

        http
                .cors().configurationSource(corsConfigurationSource());

//        customConfigurer(http);
    }
//
//    private void customConfigurer(HttpSecurity http) throws Exception {
//        http
//                .apply(new JsonSecurityConfigurer<>(loginUrl, objectMapper))
//                .successHandlerAjax(jsonAuthenticationSuccessHandler())
////                .failureHandlerAjax(ajaxAuthenticationFailureHandler)
////                .loginProcessingUrl(loginUrl)
//                .setAuthenticationManager(jsonAuthenticationManager());
////                .readAndWriteMapper(objectMapper);
//
//    }

//    public AuthenticationManager jsonAuthenticationManager() {
//        List<AuthenticationProvider> authProviderList = new ArrayList<>();
//        authProviderList.add(jsonAuthenticationProvider());
//        ProviderManager providerManager = new ProviderManager(authProviderList);
//        return providerManager;
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtils);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public JsonAuthenticationProvider jsonAuthenticationProvider() {
        return new JsonAuthenticationProvider(passwordEncoder(), userInfoUserDetailsService);
    }

    @Bean
    public JsonAuthenticationSuccessHandler jsonAuthenticationSuccessHandler() {
        return new JsonAuthenticationSuccessHandler(objectMapper, jwtUtils);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public JsonAuthenticationFilter jsonAuthenticationFilter() throws Exception {
        JsonAuthenticationFilter jsonAuthenticationFilter = new JsonAuthenticationFilter(loginUrl, objectMapper);
        jsonAuthenticationFilter.setAuthenticationManager(authenticationManagerBean());
        jsonAuthenticationFilter.setAuthenticationSuccessHandler(jsonAuthenticationSuccessHandler());

        return jsonAuthenticationFilter;
    }
}
