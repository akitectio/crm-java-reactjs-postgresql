package io.akitect.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Post is mandatory")
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @NotNull(message = "Language is mandatory")
    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    @NotBlank(message = "Title is mandatory")
    @Size(max = 255, message = "Title cannot be longer than 255 characters")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Content is mandatory")
    @Column(nullable = false)
    private String content;

    @Size(max = 255, message = "SEO title cannot be longer than 255 characters")
    private String seoTitle;

    private String seoDescription;

    @Size(max = 255, message = "SEO keywords cannot be longer than 255 characters")
    private String seoKeywords;

    @NotBlank(message = "Slug is mandatory")
    @Size(max = 255, message = "Slug cannot be longer than 255 characters")
    @Column(nullable = false, unique = true)
    private String slug;
}
