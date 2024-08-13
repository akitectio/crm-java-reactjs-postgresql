package io.akitect.crm.service;

import java.util.Optional;

public interface AuthenticationService {
    Optional<String> login(String email, String password); // Trả về Optional<String>
}
