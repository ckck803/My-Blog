package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
public class JpaConfig {

    @Bean
    public AuditorAware<String> auditorProvider(){
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userName = "";
            if(authentication!= null){
                userName = authentication.getName();
            }
            return Optional.of(userName);
        };
    }
}
