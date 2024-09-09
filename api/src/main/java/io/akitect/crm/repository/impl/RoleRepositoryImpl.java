package io.akitect.crm.repository.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import io.akitect.crm.dto.response.RoleResponse;
import io.akitect.crm.model.Role;
import io.akitect.crm.repository.RoleRepository;
import io.akitect.crm.utils.FilterMap;
import io.akitect.crm.utils.QueryHelper;
import io.akitect.crm.utils.enums.FilterOperator;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
public class RoleRepositoryImpl implements RoleRepository {
    private final QueryHelper<Role> queryHelper;

    @Autowired
    public RoleRepositoryImpl(EntityManager entityManager) {
        this.queryHelper = new QueryHelper<>(entityManager, Role.class);
    }

    @Override
    @Transactional
    public Role findOneById(Long id) {
        return queryHelper.findById(id).orElseThrow();
    }

    @Override
    @Transactional
    public List<Role> findById(Set<Long> id) {
        return queryHelper.findWithConditions(List.of(new FilterMap("id", "id", id,
                FilterOperator.IN)));
    }

    @Override
    @Transactional
    public Role insertOrUpdate(Role data) {
        return queryHelper.saveOrUpdate(data);
    }

    @Override
    public Page<RoleResponse> paginatedWithConditions(Pageable pageable, List<FilterMap> filters) {

        return queryHelper.paginatedWithConditions(RoleResponse.class, pageable, filters);
    }
}
