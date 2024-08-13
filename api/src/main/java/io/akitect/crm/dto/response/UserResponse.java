package io.akitect.crm.dto.response;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserResponse {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String username;
    private Long avatarId;
    private Boolean superUser;
    private Boolean manageSupers;
    private String permissions;
    private Timestamp emailVerifiedAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp lastLogin;
}
