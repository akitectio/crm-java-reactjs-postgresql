package io.akitect.crm.repository;

import io.akitect.crm.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {

    // Các phương thức tìm kiếm mặc định
    List<Language> findByLocale(String locale);

    List<Language> findByIsDefaultTrue();

    // Các phương thức tùy chỉnh khác nếu cần
}
