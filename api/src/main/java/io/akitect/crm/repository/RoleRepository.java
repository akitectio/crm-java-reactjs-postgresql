package io.akitect.crm.repository;

import java.util.List;
import java.util.Set;

import io.akitect.crm.model.Role;

public interface RoleRepository {
    List<Role> findById(Set<Long> id);

    Role findOneById(Long id);

    Role insertOrUpdate(Role data);
}
