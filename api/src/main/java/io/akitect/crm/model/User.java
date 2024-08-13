package io.akitect.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Email cannot be null")
    @Email(message = "Email should be valid")
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

    @NotNull(message = "Super user flag cannot be null")
    private boolean superUser;

    @NotNull(message = "Manage supers flag cannot be null")
    private boolean manageSupers;

    private String permissions;

    private Timestamp emailVerifiedAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp lastLogin;

    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Timestamp(System.currentTimeMillis());
    }
}
