package io.akitect.crm.repository.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import io.akitect.crm.dto.response.PermissionResponse;
import io.akitect.crm.model.Permission;
import io.akitect.crm.repository.PermissionRepository;
import io.akitect.crm.utils.FilterMap;
import io.akitect.crm.utils.QueryHelper;
import io.akitect.crm.utils.enums.FilterOperator;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
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
        return queryHelper.findWithConditions(List.of(new FilterMap("id", "id", id,
                FilterOperator.IN)));
    }

    @Override
    @Transactional
    public Permission insertOrUpdate(Permission data) {
        return queryHelper.saveOrUpdate(data);
    }

    @Override
    public Page<PermissionResponse> paginatedWithConditions(Pageable pageable, List<FilterMap> filters) {

        return queryHelper.paginatedWithConditions(PermissionResponse.class, pageable, filters);
    }

}
