package io.akitect.crm.service;

import io.akitect.crm.model.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    User updateUser(User user);
    void deleteUser(User user);
    void deleteUserById(Long id);
    Optional<User> findUserById(Long id);
    List<User> findAllUsers();
    List<User> findUsersWithConditions(Map<String, Object> conditions);
}
