package com.example.backend.service;

import com.example.backend.domain.Post;
import com.example.backend.domain.UserInfo;
import com.example.backend.exception.*;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserInfoRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final UserInfoRepository userInfoRepository;
    private final PostRepository postRepository;

    public Post savePost(Post post) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            Optional<UserInfo> optionalUserInfo = userInfoRepository.findUserInfoByEmail(email);

            if(optionalUserInfo.isEmpty()){
                throw new NotAuthenticatedUser("회원 정보가 없습니다.");
            }
            UserInfo userInfo = optionalUserInfo.get();
            post.setAuthor(userInfo);

            return postRepository.save(post);
        }catch (Exception e){
            throw new PostSaveFailException("포스트를 저장하는데 실패 했습니다. 원인 : " + e.getMessage());
        }
    }

    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    public void deletePost(Long id) {
        try {
            postRepository.deleteById(id);
        }catch (Exception ex){
            throw new PostDeleteFailException("포스트를 삭제하는데 실패 했습니다. 원인 : " + ex.getMessage());
        }
    }

    public Post updatePost(Long id, Post post) {
        Optional<Post> optional = postRepository.findById(id);

        if(optional.isPresent()){
            Post savedPost = optional.get();
            return savedPost.updatePost(post);
        }else{
            throw new PostUpdateFailException("포스트를 업데이트 하는데 실패 했습니다. 원인 : 해당 포스트가 존재하지 않습니다.");
        }
    }

    public Post getPost(Long id) {
        Optional<Post> optional = postRepository.findById(id);

        if(optional.isPresent()){
            return optional.get();
        }else{
            throw new PostRetrieveFailException("포스트를 업데이트 하는데 실패 했습니다. 원인 : 해당 포스트가 존재하지 않습니다.");
        }
    }
}
