package io.akitect.crm.repository.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.akitect.crm.model.User;
import io.akitect.crm.repository.UserRepository;
import io.akitect.crm.utils.FilterMap;
import io.akitect.crm.utils.QueryHelper;
import jakarta.persistence.EntityManager;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private final QueryHelper<User> queryHelper;

    @Autowired
    public UserRepositoryImpl(EntityManager entityManager) {
        this.queryHelper = new QueryHelper<>(entityManager, User.class);
    }

    @Override
    public User create(User user) {
        return queryHelper.saveOrUpdate(user);
    }

    @Override
    public User update(User user) {
        return queryHelper.saveOrUpdate(user);
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
    public List<User> findWithConditions(List<FilterMap> conditions) {
        return queryHelper.findWithConditions(conditions);
    }

    @Override
    public boolean existsByEmail(String email) {
        String queryStr = "SELECT COUNT(u) FROM User u WHERE u.email = :email";
        Long count = queryHelper.getEntityManager()
                .createQuery(queryStr, Long.class)
                .setParameter("email", email)
                .getSingleResult();
        return count > 0;
    }

    @Override
    public boolean existsByUsername(String username) {
        String queryStr = "SELECT COUNT(u) FROM User u WHERE u.username = :username";
        Long count = queryHelper.getEntityManager()
                .createQuery(queryStr, Long.class)
                .setParameter("username", username)
                .getSingleResult();
        return count > 0;
    }

}
