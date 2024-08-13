package io.akitect.crm.model;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 191)  // Define the size of the 'email' column
    private String email;

    @Column(length = 120)  // Define the size of the 'password' column
    private String password;

    @Column(length = 120)  // Define the size of the 'firstName' column
    private String firstName;

    @Column(length = 120)  // Define the size of the 'lastName' column
    private String lastName;

    @Column(length = 60)  // Define the size of the 'username' column
    private String username;

    private Long avatarId;

    private boolean superUser;

    private boolean manageSupers;

    @Column(columnDefinition = "TEXT")  // Define the type of the 'permissions' column
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
