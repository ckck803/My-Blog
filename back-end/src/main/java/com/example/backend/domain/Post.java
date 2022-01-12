package com.example.backend.domain;

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

    @ManyToOne
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private UserInfo author;

    @ManyToOne
    @JoinColumn(name = "CATEGORY", nullable = true)
    private Category category;

    public Post updatePost(Post post) {
        this.title = post.title;
        this.subTitle = post.subTitle;
        this.content = post.content;

        return this;
    }
}
