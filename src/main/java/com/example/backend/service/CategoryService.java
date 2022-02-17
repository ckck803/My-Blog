package com.example.backend.service;

import com.example.backend.domain.Category;
import com.example.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category saveOrFindCategory(String categoryName) {
        Optional<Category> optional = categoryRepository.findCategoryByName(categoryName);

        if (optional.isEmpty()) {
            Category category = Category.builder()
                    .name(categoryName)
                    .build();
            return categoryRepository.save(category);
        } else {
            return optional.get();
        }
    }
}
