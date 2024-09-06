package io.akitect.crm.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.akitect.crm.dto.request.GetUserRequest;
import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.request.UserRequestPut;
import io.akitect.crm.dto.response.UserResponse;
import io.akitect.crm.model.User;
import io.akitect.crm.repository.UserRepository;
import io.akitect.crm.service.UserService;
import io.akitect.crm.utils.FilterMap;
import io.akitect.crm.utils.enums.FilterOperator;
import jakarta.transaction.Transactional;

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
        // user.setStatus(StatusOfUser.ACTIVATED);
        userRepository.create(user);
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserRequestPut userRequestPut) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Update user entity with values from userRequest
        user = updateUserEntity(user, userRequestPut);
        userRepository.update(user);
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.remove();
        userRepository.update(user);
    }

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

    private User putUser(UserRequestPut userRequest, User user) {
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

    private User updateUserEntity(User user, UserRequestPut userRequest) {
        return putUser(userRequest, user);
    }

    private UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setUsername(user.getUsername());
        response.setAvatarId(user.getAvatarId());
        response.setSuperUser(user.getSuperUser());
        response.setManageSupers(user.getManageSupers());
        response.setPermissions(user.getPermissions());
        response.setEmailVerifiedAt(user.getEmailVerifiedAt());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setLastLogin(user.getLastLogin());
        response.setActive(user.getActive());
        return response;
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponse(user);
    }

    @Override
    public Page<UserResponse> paginatedWithConditions(PageRequest pageRequest, GetUserRequest filter) {

        return userRepository.paginatedWithConditions(pageRequest, getFilters(filter));
    }

    private List<FilterMap> getFilters(GetUserRequest filter) {
        List<FilterMap> filters = new ArrayList<>();
        if (filter.getEmail() != null)
            filters.add(new FilterMap("email", "email", "%" + filter.getEmail() + "%", FilterOperator.ILIKE));
        return filters;
    }

    @Override
    @Transactional
    public UserResponse removeSuper(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        assert user.getSuperUser() : "This user is not super";

        user.removeSuper();

        return mapToResponse(userRepository.update(user));
    }
}
