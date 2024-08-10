package io.akitect.crm.service.impl;

import io.akitect.crm.model.Language;
import io.akitect.crm.repository.LanguageRepository;
import io.akitect.crm.repository.impl.LanguageRepositoryImpl;
import io.akitect.crm.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageServiceImpl implements LanguageService {

    private final LanguageRepository languageRepository;
    private final LanguageRepositoryImpl languageRepositoryImpl;

    @Autowired
    public LanguageServiceImpl(LanguageRepository languageRepository, LanguageRepositoryImpl languageRepositoryImpl) {
        this.languageRepository = languageRepository;
        this.languageRepositoryImpl = languageRepositoryImpl;
    }

    @Override
    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    @Override
    public Optional<Language> getLanguageById(Long id) {
        return languageRepository.findById(id);
    }

    @Override
    public Language createLanguage(Language language) {
        return languageRepository.save(language);
    }

    @Override
    public Optional<Language> updateLanguage(Long id, Language updatedLanguage) {
        return languageRepository.findById(id).map(language -> {
            language.setName(updatedLanguage.getName());
            language.setLocale(updatedLanguage.getLocale());
            language.setCode(updatedLanguage.getCode());
            language.setFlag(updatedLanguage.getFlag());
            language.setIsDefault(updatedLanguage.getIsDefault());
            language.setOrder(updatedLanguage.getOrder());
            language.setIsRtl(updatedLanguage.getIsRtl());
            return languageRepository.save(language);
        });
    }

    @Override
    public void deleteLanguage(Long id) {
        languageRepository.deleteById(id);
    }

    @Override
    public List<Language> findLanguagesByCustomCriteria(String locale, Boolean isDefault) {
        if (locale != null && !locale.isEmpty()) {
            return languageRepository.findByLocale(locale);
        }
        if (isDefault != null && isDefault) {
            return languageRepository.findByIsDefaultTrue();
        }
        return languageRepositoryImpl.findLanguagesByCustomCriteria(locale, isDefault); // Sử dụng phương thức tùy chỉnh
    }
}
