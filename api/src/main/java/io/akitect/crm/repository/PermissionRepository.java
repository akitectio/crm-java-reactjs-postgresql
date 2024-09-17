package io.akitect.crm.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import io.akitect.crm.dto.response.PaginatePermissionResponse;
import io.akitect.crm.model.Permission;
import io.akitect.crm.utils.FilterMap;

public interface PermissionRepository {

    Permission findOneById(Long id);

    List<Permission> findById(Set<Long> id);

    Permission insertOrUpdate(Permission newPermission);

    Page<PaginatePermissionResponse> paginatedWithConditions(Pageable pageable,
            List<FilterMap> filters);

    Boolean delete(Long id);

    List<Permission> findAllWithFilter(List<FilterMap> filters);
}
