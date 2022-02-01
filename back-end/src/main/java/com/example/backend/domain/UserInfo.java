package com.example.backend.domain;

import com.example.backend.domain.enums.Role;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class UserInfo extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USERNAME", length = 50, nullable = false)
    private String username;

    @Column(name = "EMAIL", length = 50, nullable = false)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "USERROLE", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role userRole;

    @Column(name = "state", nullable = false)
    private boolean state;

    @Builder
    public UserInfo(String username, String email, String password, Role userRole) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.state = false;
    }

    public UserInfo changeState(boolean isAuthenticated){
        this.state = isAuthenticated;
        return this;
    }

    public UserInfo changeRole(Role role){
        this.userRole = role;
        return this;
    }
}
