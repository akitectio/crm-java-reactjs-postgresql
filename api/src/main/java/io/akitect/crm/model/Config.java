package io.akitect.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Config {
    @Id
    @NotBlank(message = "Key is mandatory")
    @Column(nullable = false, unique = true)
    private String key;

    @NotBlank(message = "Value is mandatory")
    @Column(nullable = false)
    private String value;

    private String description;
}