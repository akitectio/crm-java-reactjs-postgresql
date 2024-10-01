package io.akitect.crm.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestPut {

    @NotNull(message = "Email cannot be null")
    @Email(message = "Please provide a valid email address")
    @Size(max = 191, message = "Email cannot exceed 191 characters")
    private String email;

    @Size(max = 120, message = "First name cannot exceed 120 characters")
    private String firstName;

    @Size(max = 120, message = "Last name cannot exceed 120 characters")
    private String lastName;
}
