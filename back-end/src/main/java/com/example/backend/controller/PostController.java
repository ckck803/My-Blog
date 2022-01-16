package com.example.backend.controller;

import com.example.backend.controller.dto.RequestPost;
import com.example.backend.domain.Category;
import com.example.backend.domain.Post;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.CategoryService;
import com.example.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostController {

    private final PostService postService;
    private final CategoryService categoryService;

    @GetMapping("/hello")
    public String hello(){
        return "Hello World";
    }

    @GetMapping("/posts")
    public ResponseEntity getPosts(@PageableDefault(page = 0, size = 10) Pageable pageable){
        Page<Post> allPosts = postService.getAllPosts(pageable);

        return ResponseEntity.ok(allPosts);
    }

    @PostMapping("/new")
    public ResponseEntity createPost(@RequestBody RequestPost requestPost){
        Category category = categoryService.saveOrFindCategory(requestPost.getCategory());

        Post post = Post.builder()
                .title(requestPost.getTitle())
                .subTitle(requestPost.getSubTitle())
                .content(requestPost.getContent())
                .build();

        post.changPost(category);
        Post savedPost = postService.savePost(post);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedPost.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deletePost(@PathVariable("id") Long id){
        postService.deletePost(id);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity updatePost(@PathVariable("id") Long id, @RequestBody RequestPost requestPost){
        Post post = Post.builder()
                .title(requestPost.getTitle())
                .subTitle(requestPost.getSubTitle())
                .content(requestPost.getContent())
                .build();

        postService.updatePost(id, post);

        return ResponseEntity.ok().build();
    }
}
