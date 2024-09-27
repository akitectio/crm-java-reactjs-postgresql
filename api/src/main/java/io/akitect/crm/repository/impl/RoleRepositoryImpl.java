package io.akitect.crm.repository.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import io.akitect.crm.dto.response.PaginateRoleResponse;
import io.akitect.crm.exception.BadRequestException;
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
        return queryHelper.findById(id).orElseThrow(() -> new BadRequestException("Invalid id", null));
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
    @Transactional
    public Page<PaginateRoleResponse> paginatedWithConditions(Pageable pageable, List<FilterMap> filters) {

        return queryHelper.paginatedWithConditions(PaginateRoleResponse.class, pageable, filters);
    }

    @Override
    public List<Role> saveAll(List<Role> data) {
        return queryHelper.saveOrUpdateAll(data);
    }

    @Override
    public List<Role> findWithConditions(List<FilterMap> filters) {

        return queryHelper.findWithConditions(filters);
    }

    @Override
    public Role findDefault() {

        return queryHelper
                .findWithConditions(List.of(new FilterMap("isDefault", "isDefault", true, FilterOperator.EQUAL)))
                .getFirst();
    }
}
