package io.akitect.crm.service.impl;

import io.akitect.crm.model.User;
import io.akitect.crm.repository.UserRepository;
import io.akitect.crm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public User createUser(User user) {
        return userRepository.create(user);
    }

    @Override
    @Transactional
    public User updateUser(User user) {
        return userRepository.update(user);
    }

    @Override
    @Transactional
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> findUsersWithConditions(Map<String, Object> conditions) {
        return userRepository.findWithConditions(conditions);
    }
}
