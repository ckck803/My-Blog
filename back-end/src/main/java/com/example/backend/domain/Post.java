package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    @JoinColumn(name = "AUTHOR_ID", nullable = true)
    private UserInfo author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "CATEGORY", nullable = true, referencedColumnName = "CATEGORY_NAME")
    private Category category;

    // ==== 연관관계 편의 메서드 ==== //
    public void changPost(Category category){
        this.category = category;
        this.category
                .getPosts();
    }

    public Post updatePost(Post post) {
        this.title = post.title;
        this.subTitle = post.subTitle;
        this.content = post.content;
        changPost(post.getCategory());
        return this;
    }
}
