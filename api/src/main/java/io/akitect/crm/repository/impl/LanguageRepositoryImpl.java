package io.akitect.crm.repository.impl;

import io.akitect.crm.model.Language;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LanguageRepositoryImpl {

    @PersistenceContext
    private EntityManager entityManager;

    // Ví dụ một phương thức tùy chỉnh
    public List<Language> findLanguagesByCustomCriteria(String locale, Boolean isDefault) {
        StringBuilder queryStr = new StringBuilder("SELECT l FROM Language l WHERE 1=1");

        if (locale != null && !locale.isEmpty()) {
            queryStr.append(" AND l.locale = :locale");
        }
        if (isDefault != null) {
            queryStr.append(" AND l.isDefault = :isDefault");
        }

        TypedQuery<Language> query = entityManager.createQuery(queryStr.toString(), Language.class);

        if (locale != null && !locale.isEmpty()) {
            query.setParameter("locale", locale);
        }
        if (isDefault != null) {
            query.setParameter("isDefault", isDefault);
        }

        return query.getResultList();
    }
}
