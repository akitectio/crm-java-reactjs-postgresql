package io.akitect.crm.service;

import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.response.UserResponse;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    UserResponse updateUser(Long id, UserRequest userRequest);

    void deleteUserById(Long id);

    Optional<UserResponse> findUserById(Long id);

    List<UserResponse> findAllUsers();

    List<UserResponse> findUsersWithConditions(Map<String, Object> conditions);
}
