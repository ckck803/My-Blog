package com.example.backend.domain;

import com.example.backend.domain.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
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

    @Column(name = "ISAUTHENTICATED", nullable = false)
    private boolean isAuthenticated;

    @Builder
    public UserInfo(String username, String email, String password, Role userRole) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.isAuthenticated = false;
    }
}
