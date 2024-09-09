package io.akitect.crm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

import io.akitect.crm.dto.request.GetPermissionRequest;
import io.akitect.crm.dto.request.PostPutPermissionRequest;
import io.akitect.crm.dto.response.PermissionResponse;

public interface PermissionService {

    PermissionResponse insert(PostPutPermissionRequest data);

    PermissionResponse getOneById(Long id);

    Page<PermissionResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy, Direction order,
            GetPermissionRequest filter);
}
