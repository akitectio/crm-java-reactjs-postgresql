package io.akitect.crm.repository.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import io.akitect.crm.dto.response.PaginatePermissionResponse;
import io.akitect.crm.exception.BadRequestException;
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
    @Transactional
    public Permission findOneById(Long id) {
        return queryHelper.findById(id).orElseThrow(() -> new BadRequestException("Permission not found", null));
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
    @Transactional
    public Page<PaginatePermissionResponse> paginatedWithConditions(Pageable pageable, List<FilterMap> filters) {

        return queryHelper.paginatedWithConditions(PaginatePermissionResponse.class, pageable, filters);
    }

    @Override
    public Boolean delete(Long id) {
        try {
            queryHelper.deleteById(id);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public List<Permission> findAllWithFilter(List<FilterMap> filters) {
        return queryHelper.findWithConditions(filters);
    }
}
