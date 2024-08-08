package io.akitect.crm.service;


import io.akitect.crm.model.Language;
import io.akitect.crm.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;

    @Autowired
    public LanguageService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    public Optional<Language> getLanguageById(UUID id) {
        return languageRepository.findById(id);
    }

    public Language createLanguage(Language language) {
        return languageRepository.save(language);
    }

    public Optional<Language> updateLanguage(UUID id, Language updatedLanguage) {
        return languageRepository.findById(id).map(language -> {
            language.setCode(updatedLanguage.getCode());
            language.setName(updatedLanguage.getName());
            return languageRepository.save(language);
        });
    }

    public void deleteLanguage(UUID id) {
        languageRepository.deleteById(id);
    }
}