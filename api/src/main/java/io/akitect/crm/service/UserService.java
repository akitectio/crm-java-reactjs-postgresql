package io.akitect.crm.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

import io.akitect.crm.dto.request.GetUserRequest;
import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.request.UserRequestPut;
import io.akitect.crm.dto.response.UserResponse;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    UserResponse updateUser(Long id, UserRequestPut userRequestPut);

    void deleteUserById(Long id);

    UserResponse getUserById(Long id);

    UserResponse removeSuper(Long id);

    Page<UserResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy, Direction order,
            List<GetUserRequest> filter);

    UserResponse setRole(Long id, Long roleId);

    UserResponse changePassword(Long id, String oldPassword, String newPassword);

    UserResponse changeAvatar(Long id, Long avatarId);
}
