package io.akitect.crm.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import io.akitect.crm.dto.response.PaginateRoleResponse;
import io.akitect.crm.model.Role;
import io.akitect.crm.utils.FilterMap;

public interface RoleRepository {
    List<Role> findById(Set<Long> id);

    Role findOneById(Long id);

    Role findDefault();

    Role insertOrUpdate(Role data);

    List<Role> saveAll(List<Role> data);

    Page<PaginateRoleResponse> paginatedWithConditions(Pageable pageable,
            List<FilterMap> filters);

    List<Role> findWithConditions(List<FilterMap> filters);
}
