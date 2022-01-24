package com.example.backend.controller;

import com.example.backend.controller.dto.RequestPostDto;
import com.example.backend.domain.Category;
import com.example.backend.domain.Post;
import com.example.backend.exception.PostSaveFailException;
import com.example.backend.service.CategoryService;
import com.example.backend.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
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

    @MockBean
    private CategoryService categoryService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllTest() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/api/posts"));

        resultActions
                .andExpect(status().isOk());
    }

    @Test
    void saveTest() throws Exception {
        String title = new String("Title");
        String subTitle = new String("subTitle");
        String content = new String("content");

        RequestPostDto requestPostDto = new RequestPostDto();
        requestPostDto.setTitle(title);
        requestPostDto.setTitle(subTitle);
        requestPostDto.setContent(content);

        Post post = Post.builder()
                .id(1L)
                .title(title)
                .subTitle(subTitle)
                .content(content)
                .build();

        given(postService.savePost(any(Post.class))).willReturn(post);

        String requestBody = objectMapper.writeValueAsString(requestPostDto);

        ResultActions resultActions = mockMvc.perform(post("/api/new")
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

        RequestPostDto requestPostDto = new RequestPostDto();
        requestPostDto.setTitle(title);
        requestPostDto.setTitle(subTitle);
        requestPostDto.setContent(content);

        Post post = Post.builder()
                .id(1L)
                .title(title)
                .subTitle(subTitle)
                .content(content)
                .build();

        given(postService.savePost(any(Post.class))).willThrow(PostSaveFailException.class);

        String requestBody = objectMapper.writeValueAsString(post);

        ResultActions resultActions = mockMvc.perform(post("/api/new")
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

        ResultActions resultActions = mockMvc.perform(delete("/api/delete/"+id));

        resultActions
                .andExpect(status().isOk())
                .andDo(print());

        verify(postService).deletePost(1L);
    }

    @Test
    void saveCategoryTest() throws Exception {
        String title = "Title";
        String subTitle = "subTitle";
        String content = "content";
        String category = "category";

        RequestPostDto requestPostDto = new RequestPostDto();
        requestPostDto.setTitle(title);
        requestPostDto.setTitle(subTitle);
        requestPostDto.setContent(content);
        requestPostDto.setCategory(category);

        Category category1 = Category.builder()
                .name(category)
                .build();

        Post post = Post.builder()
                .id(1L)
                .title(title)
                .subTitle(subTitle)
                .content(content)
                .build();

        given(categoryService.saveOrFindCategory(category)).willReturn(category1);
        post.changPost(category1);
        given(postService.savePost(any(Post.class))).willReturn(post);

        String requestBody = objectMapper.writeValueAsString(requestPostDto);

        ResultActions resultActions = mockMvc.perform(post("/api/new")
                .content(requestBody)
                .contentType(MediaType.APPLICATION_JSON)
        );

        resultActions
                .andExpect(status().isCreated())
                .andDo(print());

        verify(postService).savePost(any(Post.class));
    }
}