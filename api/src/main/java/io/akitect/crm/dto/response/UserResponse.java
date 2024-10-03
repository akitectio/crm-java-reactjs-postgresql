package io.akitect.crm.dto.response;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(value = Include.ALWAYS)
public class UserResponse {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String username;
    private Long avatarId;
    private Boolean superUser;
    private Boolean manageSupers;
    private Long roleId;
    private String roleName;
    private Boolean active;
    private Timestamp emailVerifiedAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp lastLogin;

}
