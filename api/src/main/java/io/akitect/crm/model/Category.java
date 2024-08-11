package io.akitect.crm.model;

import io.akitect.crm.model.enums.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import java.time.Instant;

@Entity
@Table(name = "categories")
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(name = "parent_id", nullable = false)
    private Long parentId = 0L;

    @Column(length = 400)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 60)
    private Status status = Status.PUBLISHED;

    @Column(name = "author_id", columnDefinition = "UUID", nullable = false)
    private UUID authorId;

    @Column(length = 60)
    private String icon;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex = 0;

    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured = false;

    @Column(name = "is_default", nullable = false)
    private Boolean isDefault = false;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CategoryTranslation> translations;

    @PrePersist
    protected void onCreate() {
        Timestamp now = Timestamp.from(Instant.now());
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Timestamp.from(Instant.now());
    }
}
