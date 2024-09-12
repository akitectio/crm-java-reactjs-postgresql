package io.akitect.crm.service;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

import io.akitect.crm.dto.request.GetPermissionRequest;
import io.akitect.crm.dto.request.PostPutPermissionRequest;
import io.akitect.crm.dto.response.PaginatePermissionResponse;
import io.akitect.crm.dto.response.PermissionResponse;
import io.akitect.crm.model.Permission;

public interface PermissionService {

    PermissionResponse insert(PostPutPermissionRequest data);

    PermissionResponse getOneById(Long id);

    List<Permission> getById(Set<Long> ids);

    Page<PaginatePermissionResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy, Direction order,
            GetPermissionRequest filter);

    Boolean delete(Long id);

    PermissionResponse update(Long id, PostPutPermissionRequest data);

}
