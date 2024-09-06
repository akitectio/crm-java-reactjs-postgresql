package io.akitect.crm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import io.akitect.crm.dto.request.GetUserRequest;
import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.request.UserRequestPut;
import io.akitect.crm.dto.response.UserResponse;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    UserResponse updateUser(Long id, UserRequestPut userRequestPut);

    void deleteUserById(Long id);

    UserResponse getUserById(Long id);

    Page<UserResponse> paginatedWithConditions(PageRequest pageRequest, GetUserRequest filter);

    UserResponse removeSuper(Long id);
}
