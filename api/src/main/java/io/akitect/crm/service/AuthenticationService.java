package io.akitect.crm.service;

import io.akitect.crm.dto.response.UserResponse;

import java.util.Optional;

public interface AuthenticationService {
    Optional<String> login(String email, String password); 

    Optional<UserResponse> getUserInfoByToken();
}
