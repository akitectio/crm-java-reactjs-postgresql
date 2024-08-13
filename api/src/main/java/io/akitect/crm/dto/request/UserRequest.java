package io.akitect.crm.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequest {

    @NotNull(message = "Email cannot be null")
    @Email(message = "Please provide a valid email address")
    @Size(max = 191, message = "Email cannot exceed 191 characters")
    private String email;

    @Size(min = 8, max = 120, message = "Password should be between 8 and 120 characters")
    private String password;

    @Size(max = 120, message = "First name cannot exceed 120 characters")
    private String firstName;

    @Size(max = 120, message = "Last name cannot exceed 120 characters")
    private String lastName;

    @Size(max = 60, message = "Username cannot exceed 60 characters")
    private String username;

    private Long avatarId;

    @NotNull(message = "Super user flag is required")
    private Boolean superUser;

    @NotNull(message = "Manage supers flag is required")
    private Boolean manageSupers;

    private String permissions;
}
