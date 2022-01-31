package com.example.backend.security.config;

import com.example.backend.security.fitler.JsonAuthenticationFilter;
import com.example.backend.security.fitler.JwtAuthenticationFilter;
import com.example.backend.security.handler.JsonAuthenticationSuccessHandler;
import com.example.backend.security.provider.JsonAuthenticationProvider;
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
@Profile("local")
@Order(0)
public class LocalSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${security.url.login}")
    private String loginUrl;

    private final ObjectMapper objectMapper;

    private final JwtUtils jwtUtils;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .authenticationProvider(jsonAuthenticationProvider());
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
                .authorizeRequests()
                .antMatchers("/api/home").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/signup").permitAll()
                .antMatchers("/logout").permitAll()
                .anyRequest().authenticated();

        http
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .headers().frameOptions().disable();

        http
                .logout()
                .logoutUrl("/api/logout");

        http
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jsonAuthenticationFilter(), JwtAuthenticationFilter.class);

        http
                .cors().configurationSource(corsConfigurationSource());
    }


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
        return new JsonAuthenticationProvider(passwordEncoder(), userDetailsService());
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