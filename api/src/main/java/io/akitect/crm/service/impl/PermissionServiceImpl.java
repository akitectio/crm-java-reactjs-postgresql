package io.akitect.crm.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import io.akitect.crm.dto.request.GetPermissionRequest;
import io.akitect.crm.dto.request.PostPutPermissionRequest;
import io.akitect.crm.dto.response.PermissionResponse;
import io.akitect.crm.model.Permission;
import io.akitect.crm.repository.PermissionRepository;
import io.akitect.crm.service.PermissionService;
import io.akitect.crm.utils.FilterMap;
import io.akitect.crm.utils.enums.FilterOperator;
import jakarta.transaction.Transactional;

@Service
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    PermissionRepository permissionRepository;

    @Override
    public PermissionResponse getOneById(Long id) {

        return convertToResponse(permissionRepository.findOneById(id));
    }

    private PermissionResponse convertToResponse(Permission data) {
        PermissionResponse result = PermissionResponse.builder()
                .id(data.getId())
                .key(data.getKey())
                .description(data.getDescription())
                .name(data.getName())
                .createdAt(data.getCreatedAt())
                .updatedAt(data.getUpdatedAt())
                .deletedAt(data.getDeletedAt())
                .build();
        return result;
    }

    @Override
    public List<Permission> getById(Set<Long> ids) {
        return permissionRepository.findById(ids);
    }

    @Override
    @Transactional
    public PermissionResponse insert(PostPutPermissionRequest data) {

        Permission newPermission = Permission.builder()
                .name(data.getName())
                .key(data.getKey())
                .description(data.getDescription())
                .build();

        return convertToResponse(permissionRepository.insertOrUpdate(newPermission));
    }

    @Override
    public Page<PermissionResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy, Direction order,
            GetPermissionRequest filter) {
        pageRequest = pageRequest.withSort(order, sortBy);
        return permissionRepository.paginatedWithConditions(pageRequest, getFilters(filter));
    }

    private List<FilterMap> getFilters(GetPermissionRequest filter) {
        List<FilterMap> filters = new ArrayList<>();

        if (filter.getName() != null) {
            filters.add(new FilterMap("name", "name", "%" + filter.getName() + "%", FilterOperator.ILIKE));
        }

        if (filter.getDescription() != null) {
            filters.add(new FilterMap("description", "description", "%" + filter.getDescription() + "%",
                    FilterOperator.ILIKE));
        }

        if (filter.getKey() != null)
            filters.add(new FilterMap("key", "key", "%" + filter.getKey() + "%", FilterOperator.ILIKE));
        return filters;
    }

}
