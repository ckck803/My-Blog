package com.example.backend.controller;

import com.example.backend.controller.dto.RequestPost;
import com.example.backend.domain.Post;
import com.example.backend.exception.PostDeleteFailException;
import com.example.backend.exception.PostSaveFailException;
import com.example.backend.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.refEq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willThrow;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllTest() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/posts"));

        resultActions
                .andExpect(status().isOk());
    }

    @Test
    void saveTest() throws Exception {
        String title = new String("Title");
        String subTitle = new String("subTitle");
        String content = new String("content");

        RequestPost requestPost = new RequestPost();
        requestPost.setTitle(title);
        requestPost.setTitle(subTitle);
        requestPost.setContent(content);

        Post post = Post.builder()
                .id(1L)
                .title(title)
                .subTitle(subTitle)
                .content(content)
                .build();

        given(postService.savePost(any(Post.class))).willReturn(post);

        String requestBody = objectMapper.writeValueAsString(post);

        ResultActions resultActions = mockMvc.perform(post("/new")
                .content(requestBody)
                .contentType(MediaType.APPLICATION_JSON)
        );

        resultActions
                .andExpect(status().isCreated())
                .andDo(print());

        verify(postService).savePost(any(Post.class));
    }

    @Test
    void saveFailTest() throws Exception {
        String title = new String("Title");
        String subTitle = new String("subTitle");
        String content = new String("content");

        RequestPost requestPost = new RequestPost();
        requestPost.setTitle(title);
        requestPost.setTitle(subTitle);
        requestPost.setContent(content);

        Post post = Post.builder()
                .id(1L)
                .title(title)
                .subTitle(subTitle)
                .content(content)
                .build();

        given(postService.savePost(any(Post.class))).willThrow(PostSaveFailException.class);

        String requestBody = objectMapper.writeValueAsString(post);

        ResultActions resultActions = mockMvc.perform(post("/new")
                .content(requestBody)
                .contentType(MediaType.APPLICATION_JSON)
        );

        resultActions
                .andExpect(status().isBadRequest())
                .andDo(print());

        verify(postService).savePost(any(Post.class));
    }

    @Test
    void deletePostTest() throws Exception {
        Long id = 1L;

        ResultActions resultActions = mockMvc.perform(delete("/delete/"+id));

        resultActions
                .andExpect(status().isOk())
                .andDo(print());

        verify(postService).deletePost(1L);
    }

}