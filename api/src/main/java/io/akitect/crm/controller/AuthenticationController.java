package io.akitect.crm.controller;

import io.akitect.crm.dto.request.LoginRequest;
import io.akitect.crm.dto.response.LoginResponse;
import io.akitect.crm.dto.response.UserResponse;
import io.akitect.crm.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthenticationController  {


    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<String> token = authenticationService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return token.map(t -> ResponseEntity.ok(new LoginResponse(t, "Login successful")))
                .orElseGet(() -> ResponseEntity.status(401).body(new LoginResponse(null, "Invalid email or password")));
    }


    @GetMapping("/user-info")
    public ResponseEntity<UserResponse> getUserInfo() {
        Optional<UserResponse> user = authenticationService.getUserInfoByToken();
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
