package io.akitect.crm.dto.request;

import lombok.Data;

@Data
public class GetUserRequest {
    private String email;
    private String username;
    private String firstName;
    private String lastName;
}
