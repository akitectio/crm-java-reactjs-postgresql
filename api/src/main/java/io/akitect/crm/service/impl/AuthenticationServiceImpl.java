package io.akitect.crm.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import io.akitect.crm.component.JwtUtil;
import io.akitect.crm.dto.response.UserResponse;
import io.akitect.crm.model.User;
import io.akitect.crm.repository.UserRepository;
import io.akitect.crm.service.AuthenticationService;
import io.akitect.crm.utils.FilterMap;
import io.akitect.crm.utils.enums.FilterOperator;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Optional<String> login(String email, String password) {
        Optional<User> user = userRepository
                .findWithConditions(List.of(new FilterMap("email", "email", email, FilterOperator.EQUAL)))
                .stream().findFirst();

        if (user.isPresent()) {
            String enteredPassword = password.trim();
            String storedPasswordHash = user.get().getPassword().trim();

            // Debugging logs
            System.out.println("Entered Password: " + enteredPassword);
            System.out.println("Stored Password Hash: " + storedPasswordHash);

            if (passwordEncoder.matches(enteredPassword, storedPasswordHash)) {

                String token = jwtUtil.generateToken(user.get());
                return Optional.of(token);
            } else {
                System.out.println("Password does not match!");
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<UserResponse> getUserInfoByToken() {
        Long userId = Long.valueOf(jwtUtil.extractUserId());
        return userRepository.findById(userId).map(user -> {
            UserResponse response = new UserResponse();
            response.setId(user.getId());
            response.setEmail(user.getEmail());
            response.setFirstName(user.getFirstName());
            response.setLastName(user.getLastName());
            response.setUsername(user.getUsername());
            response.setAvatarId(user.getAvatarId());
            response.setSuperUser(user.isSuperUser());
            response.setManageSupers(user.isManageSupers());
            response.setPermissions(user.getPermissions());
            response.setEmailVerifiedAt(user.getEmailVerifiedAt());
            response.setCreatedAt(user.getCreatedAt());
            response.setUpdatedAt(user.getUpdatedAt());
            response.setLastLogin(user.getLastLogin());
            return response;
        });
    }
}
