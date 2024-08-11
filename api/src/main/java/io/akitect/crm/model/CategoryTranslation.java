package io.akitect.crm.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "categories_translations")
@Data
public class CategoryTranslation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categories_id", nullable = false)
    private Long categoryId;

    @Column(name = "lang_code", nullable = false, length = 20)
    private String langCode;

    @Column(length = 191)
    private String name;

    @Column(length = 400)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categories_id", insertable = false, updatable = false)
    private Category category;
}
