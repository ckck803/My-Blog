package com.example.backend.security.service;

import com.example.backend.controller.dto.RequestRegisterUser;
import com.example.backend.domain.UserInfo;
import com.example.backend.domain.enums.Role;
import com.example.backend.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
//@Component
public class UserInfoService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    private final UserInfoRepository userInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserInfo> optional = userInfoRepository.findUserInfoByEmail(email);

        if(optional.isEmpty()){
            throw new UsernameNotFoundException("해당 사용자가 존재하지 않습니다.");
        }

        UserInfo userInfo = optional.get();
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(userInfo.getUserRole().getRole());

        return new User(userInfo.getEmail(), userInfo.getPassword(), authorities);
    }

    @Transactional
    public UserInfo save(RequestRegisterUser registerUser) {
        try {
            UserInfo userInfo = UserInfo.builder()
                    .username(registerUser.getUsername())
                    .email(registerUser.getEmail())
                    .password(passwordEncoder.encode(registerUser.getPassword()))
                    .userRole(Role.READ)
                    .build();

            return userInfoRepository.save(userInfo);
        }catch (Exception e){
            throw new IllegalStateException("저장에 실패 했습니다.");
        }
    }
}
