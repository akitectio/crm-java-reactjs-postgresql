package io.akitect.crm.repository;

import io.akitect.crm.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Có thể thêm các phương thức tìm kiếm tùy chỉnh ở đây nếu cần
}
