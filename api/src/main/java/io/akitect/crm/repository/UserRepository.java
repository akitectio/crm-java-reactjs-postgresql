package io.akitect.crm.repository;

import java.util.List;
import java.util.Optional;

import io.akitect.crm.model.User;
import io.akitect.crm.utils.FilterMap;

public interface UserRepository {
    User create(User user);

    User update(User user);

    void delete(User user);

    void deleteById(Long id);

    Optional<User> findById(Long id);

    List<User> findAll();

    List<User> findWithConditions(List<FilterMap> conditions);

    boolean existsByEmail(String email);

    // Method to check if a username already exists
    boolean existsByUsername(String username);
}