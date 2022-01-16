package com.example.backend.security.fitler;

import com.example.backend.security.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    @Value("${security.url.login}")
    private String loginUrl;

    @Value("${security.url.signup}")
    private String signupUrl;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if(!isExclusiveUrl(request)){
            String token = "";
            String tokenHeader = request.getHeader("Token");

            if(tokenHeader != null && tokenHeader.startsWith("Bearer")){
                token = tokenHeader.substring(7);
            }

            if(token != null && jwtUtils.validateToken(token)){
                Authentication authentication = jwtUtils.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean isExclusiveUrl(HttpServletRequest request){
        List<RequestMatcher> requestMatcher = new ArrayList<>();
        requestMatcher.add(new AntPathRequestMatcher(loginUrl));
        requestMatcher.add(new AntPathRequestMatcher(signupUrl));

        for (RequestMatcher matcher : requestMatcher) {
            if(matcher.matches(request)){
                return true;
            }
        }
        return false;
    }
}

