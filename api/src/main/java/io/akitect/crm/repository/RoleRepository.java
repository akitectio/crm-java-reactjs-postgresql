package io.akitect.crm.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import io.akitect.crm.dto.response.RoleResponse;
import io.akitect.crm.model.Role;
import io.akitect.crm.utils.FilterMap;

public interface RoleRepository {
    List<Role> findById(Set<Long> id);

    Role findOneById(Long id);

    Role insertOrUpdate(Role data);

    Page<RoleResponse> paginatedWithConditions(Pageable pageable,
            List<FilterMap> filters);
}
