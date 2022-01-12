package com.example.backend.domain.enums;

public enum Role {
    READ("ROLE_READ"), WRITE("ROLE_WRITE"), ADMIN("ROLE_ADMIN");

    private String role;

    Role(String role){
        this.role = role;
    }
}
