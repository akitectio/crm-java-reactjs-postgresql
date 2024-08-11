package io.akitect.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "languages")
@Data
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Language name is mandatory")
    @Size(max = 120, message = "Language name cannot be longer than 120 characters")
    private String name;

    @NotBlank(message = "Locale is mandatory")
    @Size(max = 20, message = "Locale cannot be longer than 20 characters")
    private String locale;

    @NotBlank(message = "Language code is mandatory")
    @Size(max = 20, message = "Language code cannot be longer than 20 characters")
    private String code;

    private String flag;

    private Boolean isDefault;

    private Integer orderIndex;

    private Boolean isRtl;
}
