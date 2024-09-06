package io.akitect.crm.repository;

import java.util.List;
import java.util.Set;

import io.akitect.crm.model.Permission;

public interface PermissionRepository {

    Permission findOneById(Long id);

    List<Permission> findById(Set<Long> id);

    Permission insertOrUpdate(Permission newPermission);

}
