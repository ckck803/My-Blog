package com.example.backend.controller;

import com.example.backend.controller.dto.RequestRegisterUser;
import com.example.backend.domain.UserInfo;
import com.example.backend.security.service.UserInfoUserDetailsService;
import com.example.backend.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserInfoService userInfoService;

    @PostMapping("/signup")
    public ResponseEntity registerUser(@RequestBody RequestRegisterUser registerUser) {
        registerUser.setPassword(registerUser.getPassword());
        UserInfo userinfo = userInfoService.saveUser(registerUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    public void logout() {
    }
}
