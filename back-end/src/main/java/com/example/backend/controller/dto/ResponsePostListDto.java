package com.example.backend.controller.dto;

import com.example.backend.domain.Post;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResponsePostListDto {
    private List<Post> postList;
    private Integer numOfElements;
    private Long totalElements;
    private Integer pagingSize;
    private Integer pageIndex;
    private Integer pageLimit;
}
