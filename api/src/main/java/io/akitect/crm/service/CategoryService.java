package io.akitect.crm.service;

import io.akitect.crm.model.enums.Status;
import io.akitect.crm.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    List<Category> getAllCategories();

    Optional<Category> getCategoryById(Long id);

    Category createCategory(Category category);

    Optional<Category> updateCategory(Long id, Category updatedCategory);

    void deleteCategory(Long id);

    List<Category> getCategoriesByStatus(Status status);
}
