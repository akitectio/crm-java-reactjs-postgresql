package io.akitect.crm.repository;

import io.akitect.crm.model.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserRepository {
    User create(User user);
    User update(User user);
    void delete(User user);
    void deleteById(Long id);
    Optional<User> findById(Long id);
    List<User> findAll();
    List<User> findWithConditions(Map<String, Object> conditions);
    boolean existsByEmail(String email);
    // Method to check if a username already exists
    boolean existsByUsername(String username);
}