package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post extends BaseEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column(name = "POST_TITLE", length = 100, nullable = false)
    private String title;

    @Column(name = "POST_SUBTITLE")
    private String subTitle;

    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "username", nullable = false, referencedColumnName = "username")
    private UserInfo author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "CATEGORY", nullable = true, referencedColumnName = "CATEGORY_NAME")
    private Category category;

    // ==== 연관관계 편의 메서드 ==== //
    public void changeCategory(Category category){
        this.category = category;
        // 새로운 카테고리에 해당 포스트 추가
        category.addPost(this);
    }

    public void setAuthor(UserInfo author){
        this.author = author;
    }

    public Post updatePost(Post post) {
        this.title = post.title;
        this.subTitle = post.subTitle;
        this.content = post.content;
        changeCategory(post.getCategory());
        return this;
    }
}
