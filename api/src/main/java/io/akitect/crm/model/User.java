package io.akitect.crm.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "username")
})
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 191, unique = true)  // Define the size and uniqueness of the 'email' column
    private String email;

    @Column(length = 120)  // Define the size of the 'password' column
    private String password;

    @Column(length = 120)  // Define the size of the 'firstName' column
    private String firstName;

    @Column(length = 120)  // Define the size of the 'lastName' column
    private String lastName;

    @Column(length = 60, unique = true)  // Define the size and uniqueness of the 'username' column
    private String username;

    private Long avatarId;

    private boolean superUser;

    private boolean manageSupers;

    @Column(columnDefinition = "TEXT")  // Define the type of the 'permissions' column
    private String permissions;

    // @Enumerated(EnumType.STRING)
    // @Column(nullable = false, length = 60)
    // private StatusOfUser status = StatusOfUser.ACTIVATED;

    private Timestamp emailVerifiedAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp lastLogin;

    private Timestamp deletedAt;


    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    public void remove() {
        deletedAt = new Timestamp(System.currentTimeMillis());
    }

}
