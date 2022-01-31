package com.example.backend.security.service;

import com.example.backend.controller.dto.RequestRegisterUser;
import com.example.backend.domain.UserInfo;
import com.example.backend.domain.enums.Role;
import com.example.backend.repository.UserInfoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ActiveProfiles("local")
class UserInfoServiceTest {

    @Mock
    private UserInfoRepository userInfoRepository;

    private PasswordEncoder passwordEncoder;

    private UserInfoService userInfoService;

    @BeforeEach
    void init(){
        MockitoAnnotations.openMocks(this);
        passwordEncoder = new BCryptPasswordEncoder();
        this.userInfoService = new UserInfoService(passwordEncoder, userInfoRepository);
    }

    @Test
    void loadUserInfo() {
        String username = "tester";
        String email = "test@test.com";
        String password = "1q2w3e4r!";

        UserInfo savedUser = UserInfo.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .userRole(Role.READ)
                .build();
        savedUser.changeState(true);

        given(userInfoRepository.findUserInfoByEmail(email)).willReturn(Optional.of(savedUser));
        UserDetails loadUserByUsername = userInfoService.loadUserByUsername(email);

        assertThat(loadUserByUsername.getUsername()).isEqualTo(email);
        assertThat(passwordEncoder.matches(password, loadUserByUsername.getPassword())).isTrue();
        assertThat(loadUserByUsername.getAuthorities().toArray()[0].toString()).isEqualTo(Role.READ.getRole());

        verify(userInfoRepository).findUserInfoByEmail(email);
    }

    @Test
    void saveUserInfo() {
        String username = "tester";
        String email = "test@test.com";
        String password = "1q2w3e4r!";

        RequestRegisterUser registerUser = new RequestRegisterUser();
        registerUser.setUsername(username);
        registerUser.setEmail(email);
        registerUser.setPassword(password);

        UserInfo userInfo = UserInfo.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .userRole(Role.READ)
                .build();

        given(userInfoRepository.save(any(UserInfo.class))).willReturn(userInfo);
        UserInfo savedUserInfo = userInfoService.saveUser(registerUser);

        assertThat(savedUserInfo.getUsername()).isEqualTo(userInfo.getUsername());
        assertThat(savedUserInfo.getEmail()).isEqualTo(userInfo.getEmail());
        assertThat(savedUserInfo.getPassword()).isEqualTo(userInfo.getPassword());
        assertThat(savedUserInfo.getUserRole().getRole()).isEqualTo(userInfo.getUserRole().getRole());

        verify(userInfoRepository).save(any(UserInfo.class));
    }
}