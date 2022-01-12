package com.example.backend.domain;

import com.example.backend.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class PostTest {

    @Autowired
    private PostRepository postRepository;

    @Test
    void createPostTest(){
        String title = "title";
        String subTitle = "subTitle";
        String content = "content";

        Post post = Post.builder()
                .title(title)
                .subTitle(subTitle)
                .content(content)
                .build();

        Post savedPost = postRepository.save(post);
        assertThat(savedPost.getTitle()).isEqualTo(title);
        assertThat(savedPost.getSubTitle()).isEqualTo(subTitle);
        assertThat(savedPost.getContent()).isEqualTo(content);
        assertThat(savedPost.getCreatedTime()).isNotNull();
        assertThat(savedPost.getCreatedTime()).isEqualTo(savedPost.getLastModifiedTime());
    }

}