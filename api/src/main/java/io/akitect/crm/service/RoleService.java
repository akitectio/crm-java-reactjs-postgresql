package io.akitect.crm.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

import io.akitect.crm.dto.request.GetRoleRequest;
import io.akitect.crm.dto.request.PostPutRoleRequest;
import io.akitect.crm.dto.response.PaginateRoleResponse;
import io.akitect.crm.dto.response.RoleResponse;

public interface RoleService {
    RoleResponse insert(PostPutRoleRequest data);

    RoleResponse getOneById(Long id);

    List<String> getPermissionByRole(Long id);

    Page<PaginateRoleResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy, Direction order,
            GetRoleRequest filter);
}
