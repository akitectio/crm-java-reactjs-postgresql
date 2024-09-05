package io.akitect.crm.repository.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import io.akitect.crm.model.Permission;
import io.akitect.crm.repository.PermissionRepository;
import io.akitect.crm.utils.QueryHelper;
import io.akitect.crm.utils.enums.FilterOperation;
import jakarta.persistence.EntityManager;

public class PermissionRepositoryImpl implements PermissionRepository {
    private final QueryHelper<Permission> queryHelper;

    @Autowired
    public PermissionRepositoryImpl(EntityManager entityManager) {
        this.queryHelper = new QueryHelper<>(entityManager, Permission.class);
    }

    @Override
    public Permission findOneById(Long id) {
        return queryHelper.findById(id).orElseThrow();
    }

    @Override
    public List<Permission> findById(Set<Long> id) {
        String queryString = "SELECT * FROM Permission WHERE id " + FilterOperation.EQUAL + " :id";
        return queryHelper.getEntityManager().createQuery(queryString, Permission.class).getResultList();

    }

}
