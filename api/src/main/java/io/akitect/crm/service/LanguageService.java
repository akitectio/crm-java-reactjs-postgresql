package io.akitect.crm.service;

import io.akitect.crm.model.Language;

import java.util.List;
import java.util.Optional;

public interface LanguageService {
    List<Language> getAllLanguages();
    Optional<Language> getLanguageById(Long id);
    Language createLanguage(Language language);
    Optional<Language> updateLanguage(Long id, Language updatedLanguage);
    void deleteLanguage(Long id);
    List<Language> findLanguagesByCustomCriteria(String locale, Boolean isDefault);
}
