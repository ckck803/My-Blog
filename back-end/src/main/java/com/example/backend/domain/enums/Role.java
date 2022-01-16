package com.example.backend.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    READ("ROLE_READ"), WRITE("ROLE_WRITE"), ADMIN("ROLE_ADMIN");

    private final String role;
}
