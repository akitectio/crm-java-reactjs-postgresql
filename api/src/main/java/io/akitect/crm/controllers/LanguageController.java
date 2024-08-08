package io.akitect.crm.controllers;

import io.akitect.crm.model.Language;
import io.akitect.crm.service.LanguageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/languages")
@Tag(name = "Language", description = "Language management APIs")
public class LanguageController {

    private final LanguageService languageService;

    @Autowired
    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @GetMapping
    @Operation(summary = "Get all languages")
    public List<Language> getAllLanguages() {
        return languageService.getAllLanguages();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a language by ID")
    public ResponseEntity<Language> getLanguageById(@PathVariable UUID id) {
        Optional<Language> language = languageService.getLanguageById(id);
        return language.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Create a new language")
    public ResponseEntity<Language> createLanguage(@Valid @RequestBody Language language) {
        Language createdLanguage = languageService.createLanguage(language);
        return ResponseEntity.ok(createdLanguage);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a language")
    public ResponseEntity<Language> updateLanguage(@PathVariable UUID id, @Valid @RequestBody Language updatedLanguage) {
        Optional<Language> language = languageService.updateLanguage(id, updatedLanguage);
        return language.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a language")
    public ResponseEntity<Void> deleteLanguage(@PathVariable UUID id) {
        languageService.deleteLanguage(id);
        return ResponseEntity.noContent().build();
    }
}