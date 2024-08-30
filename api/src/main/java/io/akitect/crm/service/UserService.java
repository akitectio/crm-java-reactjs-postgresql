package io.akitect.crm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.response.UserResponse;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);
    UserResponse updateUser(Long id, UserRequest userRequest);
    void deleteUserById(Long id);

    Page<UserResponse> paginateWithFilter(PageRequest pageRequest, String sortBy, Direction order, UserRequest userRequest);
}
