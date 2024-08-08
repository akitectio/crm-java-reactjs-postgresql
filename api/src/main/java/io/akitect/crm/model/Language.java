package io.akitect.crm.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import org.hibernate.annotations.GenericGenerator;
import java.util.UUID;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Language {
    @Id
    @GeneratedValue(generator = "UUID")
    @Column(updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "Code is mandatory")
    @Size(max = 10, message = "Code cannot be longer than 10 characters")
    @Column(nullable = false, unique = true, length = 10)
    private String code;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 50, message = "Name cannot be longer than 50 characters")
    @Column(nullable = false, length = 50)
    private String name;
}