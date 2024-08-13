package io.akitect.crm.service.impl;

import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.response.UserResponse;
import io.akitect.crm.model.User;
import io.akitect.crm.repository.UserRepository;
import io.akitect.crm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    @Transactional
    public UserResponse createUser(UserRequest userRequest) {
        User user = mapToEntity(userRequest);
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userRepository.create(user);
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Update user entity with values from userRequest
        user = updateUserEntity(user, userRequest);
        userRepository.update(user);
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Optional<UserResponse> findUserById(Long id) {
        return userRepository.findById(id).map(this::mapToResponse);
    }

    @Override
    @Transactional
    public List<UserResponse> findAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<UserResponse> findUsersWithConditions(Map<String, Object> conditions) {
        return userRepository.findWithConditions(conditions).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Utility methods to map between UserRequest, User, and UserResponse

    private User mapToEntity(UserRequest userRequest) {
        User user = new User();
        return getUser(userRequest, user);
    }

    private User getUser(UserRequest userRequest, User user) {
        user.setEmail(userRequest.getEmail());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setUsername(userRequest.getUsername());
        user.setAvatarId(userRequest.getAvatarId());
        user.setSuperUser(userRequest.getSuperUser());
        user.setManageSupers(userRequest.getManageSupers());
        user.setPermissions(userRequest.getPermissions());
        return user;
    }

    private User updateUserEntity(User user, UserRequest userRequest) {
        return getUser(userRequest, user);
    }

    private UserResponse mapToResponse(User user) {
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
    }
}
