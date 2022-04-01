package com.example.backend;

import com.example.backend.controller.dto.RequestRegisterUser;
import com.example.backend.domain.Category;
import com.example.backend.domain.Post;
import com.example.backend.domain.UserInfo;
import com.example.backend.domain.enums.Role;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserInfoRepository;
import com.example.backend.service.CategoryService;
import com.example.backend.service.PostService;
import com.example.backend.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Component
@RequiredArgsConstructor
@Profile("local")
public class initDB {

    private final PostService postService;
    private final CategoryService categoryService;
    private final UserInfoService userInfoService;
    private final UserInfoRepository userInfoRepository;
    private final PostRepository postRepository;

    @PostConstruct
    public void init(){
        initUserInfo();
        initPost();
    }


    @Transactional
    public void initUserInfo(){
        RequestRegisterUser registerUser = new RequestRegisterUser();
        registerUser.setUsername("test");
        registerUser.setEmail("test@test.com");
        registerUser.setPassword("1234");
        UserInfo userInfo = userInfoService.saveUser(registerUser);

        userInfoService.changeUserState(userInfo.getEmail());
        userInfoService.changeUserRole(userInfo.getEmail(), Role.WRITE);
    }

    @Transactional
    public void initPost(){
        String categoryName = "Category";
        String email = "test@test.com";
        UserInfo userInfo = userInfoRepository.findUserInfoByEmail(email).get();
        Category category = categoryService.saveOrFindCategory(categoryName);

        Post post = Post.builder()
                .title("test1")
                .subTitle("test1")
                .content("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in massa tempor nec feugiat nisl pretium. Vehicula ipsum a arcu cursus. At auctor urna nunc id cursus metus aliquam eleifend mi. Nunc mattis enim ut tellus elementum sagittis. Sed euismod nisi porta lorem. Praesent elementum facilisis leo vel fringilla. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Quis lectus nulla at volutpat diam. Erat velit scelerisque in dictum. Nisl suscipit adipiscing bibendum est ultricies. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Etiam sit amet nisl purus in mollis nunc.\n" +
                        "\n" +
                        "Ante in nibh mauris cursus. Adipiscing at in tellus integer. Placerat duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet. Tortor aliquam nulla facilisi cras. Elementum tempus egestas sed sed. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Duis tristique sollicitudin nibh sit amet commodo nulla. Nibh sed pulvinar proin gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Volutpat est velit egestas dui id ornare arcu. Aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida hendrerit lectus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Aenean et tortor at risus viverra adipiscing at in. Iaculis urna id volutpat lacus laoreet non curabitur gravida.")
                .build();
        post.changeCategory(category);
        post.setAuthor(userInfo);
        postRepository.save(post);

        Post post2 = Post.builder()
                .title("test2")
                .subTitle("test2")
                .content("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in massa tempor nec feugiat nisl pretium. Vehicula ipsum a arcu cursus. At auctor urna nunc id cursus metus aliquam eleifend mi. Nunc mattis enim ut tellus elementum sagittis. Sed euismod nisi porta lorem. Praesent elementum facilisis leo vel fringilla. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Quis lectus nulla at volutpat diam. Erat velit scelerisque in dictum. Nisl suscipit adipiscing bibendum est ultricies. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Etiam sit amet nisl purus in mollis nunc.\n" +
                        "\n" +
                        "Ante in nibh mauris cursus. Adipiscing at in tellus integer. Placerat duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet. Tortor aliquam nulla facilisi cras. Elementum tempus egestas sed sed. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Duis tristique sollicitudin nibh sit amet commodo nulla. Nibh sed pulvinar proin gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Volutpat est velit egestas dui id ornare arcu. Aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida hendrerit lectus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Aenean et tortor at risus viverra adipiscing at in. Iaculis urna id volutpat lacus laoreet non curabitur gravida.")
                .build();
        post2.changeCategory(category);
        post2.setAuthor(userInfo);
        postRepository.save(post2);

        Post post3 = Post.builder()
                .title("test3")
                .subTitle("test3")
                .content("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in massa tempor nec feugiat nisl pretium. Vehicula ipsum a arcu cursus. At auctor urna nunc id cursus metus aliquam eleifend mi. Nunc mattis enim ut tellus elementum sagittis. Sed euismod nisi porta lorem. Praesent elementum facilisis leo vel fringilla. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Quis lectus nulla at volutpat diam. Erat velit scelerisque in dictum. Nisl suscipit adipiscing bibendum est ultricies. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Etiam sit amet nisl purus in mollis nunc.\n" +
                        "\n" +
                        "Ante in nibh mauris cursus. Adipiscing at in tellus integer. Placerat duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet. Tortor aliquam nulla facilisi cras. Elementum tempus egestas sed sed. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Duis tristique sollicitudin nibh sit amet commodo nulla. Nibh sed pulvinar proin gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Volutpat est velit egestas dui id ornare arcu. Aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida hendrerit lectus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Aenean et tortor at risus viverra adipiscing at in. Iaculis urna id volutpat lacus laoreet non curabitur gravida.")
                .build();
        post3.changeCategory(category);
        post3.setAuthor(userInfo);
        postRepository.save(post3);

        Post post4 = Post.builder()
                .title("test4")
                .subTitle("test4")
                .content("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in massa tempor nec feugiat nisl pretium. Vehicula ipsum a arcu cursus. At auctor urna nunc id cursus metus aliquam eleifend mi. Nunc mattis enim ut tellus elementum sagittis. Sed euismod nisi porta lorem. Praesent elementum facilisis leo vel fringilla. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Quis lectus nulla at volutpat diam. Erat velit scelerisque in dictum. Nisl suscipit adipiscing bibendum est ultricies. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Etiam sit amet nisl purus in mollis nunc.\n" +
                        "\n" +
                        "Ante in nibh mauris cursus. Adipiscing at in tellus integer. Placerat duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet. Tortor aliquam nulla facilisi cras. Elementum tempus egestas sed sed. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Duis tristique sollicitudin nibh sit amet commodo nulla. Nibh sed pulvinar proin gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Volutpat est velit egestas dui id ornare arcu. Aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida hendrerit lectus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Aenean et tortor at risus viverra adipiscing at in. Iaculis urna id volutpat lacus laoreet non curabitur gravida.")
                .build();
        post4.changeCategory(category);
        post4.setAuthor(userInfo);
        postRepository.save(post4);

        Post post5 = Post.builder()
                .title("test5")
                .subTitle("test5")
                .content("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in massa tempor nec feugiat nisl pretium. Vehicula ipsum a arcu cursus. At auctor urna nunc id cursus metus aliquam eleifend mi. Nunc mattis enim ut tellus elementum sagittis. Sed euismod nisi porta lorem. Praesent elementum facilisis leo vel fringilla. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Quis lectus nulla at volutpat diam. Erat velit scelerisque in dictum. Nisl suscipit adipiscing bibendum est ultricies. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Etiam sit amet nisl purus in mollis nunc.\n" +
                        "\n" +
                        "Ante in nibh mauris cursus. Adipiscing at in tellus integer. Placerat duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet. Tortor aliquam nulla facilisi cras. Elementum tempus egestas sed sed. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Duis tristique sollicitudin nibh sit amet commodo nulla. Nibh sed pulvinar proin gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Volutpat est velit egestas dui id ornare arcu. Aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida hendrerit lectus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Aenean et tortor at risus viverra adipiscing at in. Iaculis urna id volutpat lacus laoreet non curabitur gravida.")
                .build();
        post5.changeCategory(category);
        post5.setAuthor(userInfo);
        postRepository.save(post5);

        Post post6 = Post.builder()
                .title("test6")
                .subTitle("test6")
                .content("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in massa tempor nec feugiat nisl pretium. Vehicula ipsum a arcu cursus. At auctor urna nunc id cursus metus aliquam eleifend mi. Nunc mattis enim ut tellus elementum sagittis. Sed euismod nisi porta lorem. Praesent elementum facilisis leo vel fringilla. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Quis lectus nulla at volutpat diam. Erat velit scelerisque in dictum. Nisl suscipit adipiscing bibendum est ultricies. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Etiam sit amet nisl purus in mollis nunc.\n" +
                        "\n" +
                        "Ante in nibh mauris cursus. Adipiscing at in tellus integer. Placerat duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet. Tortor aliquam nulla facilisi cras. Elementum tempus egestas sed sed. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Duis tristique sollicitudin nibh sit amet commodo nulla. Nibh sed pulvinar proin gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Volutpat est velit egestas dui id ornare arcu. Aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida hendrerit lectus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Aenean et tortor at risus viverra adipiscing at in. Iaculis urna id volutpat lacus laoreet non curabitur gravida.")
                .build();
        post6.changeCategory(category);
        post6.setAuthor(userInfo);
        postRepository.save(post6);


        Post post7 = Post.builder()
                .title("test7")
                .subTitle("test7")
                .content("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in massa tempor nec feugiat nisl pretium. Vehicula ipsum a arcu cursus. At auctor urna nunc id cursus metus aliquam eleifend mi. Nunc mattis enim ut tellus elementum sagittis. Sed euismod nisi porta lorem. Praesent elementum facilisis leo vel fringilla. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Quis lectus nulla at volutpat diam. Erat velit scelerisque in dictum. Nisl suscipit adipiscing bibendum est ultricies. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Etiam sit amet nisl purus in mollis nunc.\n" +
                        "\n" +
                        "Ante in nibh mauris cursus. Adipiscing at in tellus integer. Placerat duis ultricies lacus sed turpis tincidunt id. Consequat interdum varius sit amet. Tortor aliquam nulla facilisi cras. Elementum tempus egestas sed sed. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Duis tristique sollicitudin nibh sit amet commodo nulla. Nibh sed pulvinar proin gravida. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Volutpat est velit egestas dui id ornare arcu. Aliquam vestibulum morbi blandit cursus risus at ultrices. Nibh sed pulvinar proin gravida hendrerit lectus. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Aenean et tortor at risus viverra adipiscing at in. Iaculis urna id volutpat lacus laoreet non curabitur gravida.")
                .build();
        post7.changeCategory(category);
        post7.setAuthor(userInfo);
        postRepository.save(post7);
    }
}
