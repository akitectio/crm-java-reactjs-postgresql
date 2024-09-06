package io.akitect.crm.service;

import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.request.UserRequestPut;
import io.akitect.crm.dto.response.UserResponse;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);
    UserResponse updateUser(Long id, UserRequestPut userRequestPut);
    void deleteUserById(Long id);


    UserResponse getUserById (Long id);
}
