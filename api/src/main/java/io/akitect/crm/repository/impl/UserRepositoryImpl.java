package io.akitect.crm.repository.impl;

import io.akitect.crm.model.User;
import io.akitect.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.akitect.crm.utils.QueryHelper;

import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private final QueryHelper<User> queryHelper;

    @Autowired
    public UserRepositoryImpl(EntityManager entityManager) {
        this.queryHelper = new QueryHelper<>(User.class);
    }

    @Override
    public User create(User user) {
        return queryHelper.create(user);
    }

    @Override
    public User update(User user) {
        return queryHelper.update(user);
    }

    @Override
    public void delete(User user) {
        queryHelper.delete(user);
    }

    @Override
    public void deleteById(Long id) {
        queryHelper.deleteById(id);
    }

    @Override
    public Optional<User> findById(Long id) {
        return queryHelper.findById(id);
    }

    @Override
    public List<User> findAll() {
        return queryHelper.findAll();
    }

    @Override
    public List<User> findWithConditions(Map<String, Object> conditions) {
        return queryHelper.findWithConditions(conditions);
    }
}