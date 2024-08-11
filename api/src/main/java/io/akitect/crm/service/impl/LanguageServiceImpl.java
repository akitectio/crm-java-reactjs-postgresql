package io.akitect.crm.service.impl;

import io.akitect.crm.model.Language;
import io.akitect.crm.service.LanguageService;
import io.akitect.crm.utils.EntityManagerHelper;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@Service
public class LanguageServiceImpl implements LanguageService {

    private final EntityManagerHelper<Language> entityManagerHelper;

    @Autowired
    public LanguageServiceImpl(EntityManager entityManager) {
        // Khởi tạo EntityManagerHelper cho thực thể Language
        this.entityManagerHelper = new EntityManagerHelper<>(entityManager, Language.class);
    }

    @Override
    public List<Language> getAllLanguages() {
        return entityManagerHelper.findAll();
    }

    @Override
    public Optional<Language> getLanguageById(Long id) {
        return entityManagerHelper.findById(id);
    }

    @Override
    public Language createLanguage(Language language) {
        return entityManagerHelper.create(language);
    }

    @Override
    public Optional<Language> updateLanguage(Long id, Language updatedLanguage) {
        return entityManagerHelper.findById(id).map(language -> {
            language.setName(updatedLanguage.getName());
            language.setLocale(updatedLanguage.getLocale());
            language.setCode(updatedLanguage.getCode());
            language.setFlag(updatedLanguage.getFlag());
            language.setIsDefault(updatedLanguage.getIsDefault());
            language.setOrderIndex(updatedLanguage.getOrderIndex());
            language.setIsRtl(updatedLanguage.getIsRtl());
            return entityManagerHelper.update(language);
        });
    }

    @Override
    public void deleteLanguage(Long id) {
        entityManagerHelper.deleteById(id);
    }

    @Override
    public List<Language> findLanguagesByCustomCriteria(String locale, Boolean isDefault) {
        Map<String, Object> conditions = new HashMap<>();
        if (locale != null && !locale.isEmpty()) {
            conditions.put("locale", locale);
        }
        if (isDefault != null) {
            conditions.put("isDefault", isDefault);
        }
        return entityManagerHelper.findWithConditions(conditions);
    }
}
