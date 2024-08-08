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
public class SeriesTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Series is mandatory")
    @ManyToOne
    @JoinColumn(name = "series_id", nullable = false)
    private Series series;

    @NotNull(message = "Language is mandatory")
    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 255, message = "Name cannot be longer than 255 characters")
    @Column(nullable = false)
    private String name;

    private String description;

    @NotBlank(message = "Slug is mandatory")
    @Size(max = 255, message = "Slug cannot be longer than 255 characters")
    @Column(nullable = false, unique = true)
    private String slug;
}