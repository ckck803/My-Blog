package com.example.backend.security.config.configurer;

import org.springframework.security.config.annotation.web.HttpSecurityBuilder;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.ArrayList;
import java.util.List;

public class JwtSecurityConfigurer <H extends HttpSecurityBuilder<H>>
        extends AbstractHttpConfigurer<CsrfConfigurer<H>, H> {

    private List<RequestMatcher> ignoredCsrfProtectionMatchers = new ArrayList<>();
}
