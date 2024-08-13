package io.akitect.crm.service.impl;

import io.akitect.crm.model.User;
import io.akitect.crm.repository.UserRepository;
import io.akitect.crm.service.AuthenticationService;
import io.akitect.crm.component.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil = new JwtUtil();

    @Autowired
    public AuthenticationServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<String> login(String email, String password) {
        Optional<User> user = userRepository.findWithConditions(Map.of("email", email))
                .stream().findFirst();

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String token = jwtUtil.generateToken(email);
            return Optional.of(token);
        }
        return Optional.empty();
    }
}
