package io.akitect.crm.service.impl;

import io.akitect.crm.model.Category;
import io.akitect.crm.model.enums.Status;
import io.akitect.crm.service.CategoryService;
import io.akitect.crm.utils.EntityManagerHelper;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final EntityManagerHelper<Category> entityManagerHelper;

    @Autowired
    public CategoryServiceImpl(EntityManager entityManager) {
        // Khởi tạo EntityManagerHelper cho thực thể Category
        this.entityManagerHelper = new EntityManagerHelper<>(entityManager, Category.class);
    }

    @Override
    public List<Category> getAllCategories() {
        return entityManagerHelper.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return entityManagerHelper.findById(id);
    }

    @Override
    public Category createCategory(Category category) {
        return entityManagerHelper.create(category);
    }

    @Override
    public Optional<Category> updateCategory(Long id, Category updatedCategory) {
        return entityManagerHelper.findById(id).map(category -> {
            category.setName(updatedCategory.getName());
            category.setDescription(updatedCategory.getDescription());
            category.setStatus(updatedCategory.getStatus());
            // Cập nhật các trường khác nếu cần
            return entityManagerHelper.update(category);
        });
    }

    @Override
    public void deleteCategory(Long id) {
        entityManagerHelper.deleteById(id);
    }

    @Override
    public List<Category> getCategoriesByStatus(Status status) {
        return entityManagerHelper.findWithConditions(Map.of("status", status));
    }
}
