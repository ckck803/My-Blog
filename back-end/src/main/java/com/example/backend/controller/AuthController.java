package com.example.backend.controller;

import com.example.backend.controller.dto.RequestRegisterUser;
import com.example.backend.domain.UserInfo;
import com.example.backend.security.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserInfoService userInfoService;

    @PostMapping("/signup")
    public ResponseEntity registerUser(@RequestBody RequestRegisterUser registerUser) {
        UserInfo userinfo = userInfoService.saveUser(registerUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    public void logout() {
    }

//    @PostConstruct
//    public void init(){
//        RequestRegisterUser registerUser = new RequestRegisterUser();
//        registerUser.setUsername("test");
//        registerUser.setEmail("test@test.com");
//        registerUser.setPassword("1234");
//        UserInfo userInfo = userInfoService.saveUser(registerUser);
//
//        userInfoService.changeUserState(userInfo.getEmail());
//    }
}
