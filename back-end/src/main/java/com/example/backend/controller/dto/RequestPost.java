package com.example.backend.controller.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestPost {

    @NotNull
    private String title;
    private String subTitle;
    private String content;
}
