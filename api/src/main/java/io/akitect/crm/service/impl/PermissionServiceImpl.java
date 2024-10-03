package io.akitect.crm.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import io.akitect.crm.dto.request.GetPermissionRequest;
import io.akitect.crm.dto.request.PostPutPermissionRequest;
import io.akitect.crm.dto.response.GetDisplay;
import io.akitect.crm.dto.response.PaginatePermissionResponse;
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
    @Transactional
    public PermissionResponse getOneById(Long id) {

        return convertToResponse(permissionRepository.findOneById(id));
    }

    private PermissionResponse convertToResponse(Permission data) {
        PermissionResponse result = PermissionResponse.builder()
                .id(data.getId())
                .key(data.getKey())
                .parentId(data.getParent() != null ? data.getParent().getId() : null)
                .name(data.getName())
                .createdAt(data.getCreatedAt())
                .updatedAt(data.getUpdatedAt())
                .deletedAt(data.getDeletedAt())
                .build();
        result.setChildren(data.getChildren());
        return result;
    }

    @Override
    public List<Permission> getById(Set<Long> ids) {
        return permissionRepository.findById(ids);
    }

    @Override
    @Transactional
    public PermissionResponse insert(PostPutPermissionRequest data) {
        Permission parentPermission = null;
        if (data.getParentId() != null) {
            parentPermission = permissionRepository.findOneById(data.getParentId());
        }

        Permission newPermission = Permission.builder()
                .name(data.getName())
                .parent(parentPermission)
                .key(parentPermission != null ? parentPermission.getKey() + "." + data.getName().toLowerCase()
                        : data.getName().toLowerCase())
                .build();

        return convertToResponse(permissionRepository.insertOrUpdate(newPermission));
    }

    @Override
    public Page<PaginatePermissionResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy,
            Direction order,
            GetPermissionRequest filter) {
        pageRequest = pageRequest.withSort(order, sortBy);
        return permissionRepository.paginatedWithConditions(pageRequest, getFilters(filter));
    }

    private List<FilterMap> getFilters(GetPermissionRequest filter) {
        List<FilterMap> filters = new ArrayList<>();

        filters.add(new FilterMap("deletedAt", "deletedAt", null, FilterOperator.IS));

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

    @Override
    public Boolean delete(Long id) {
        Permission target = permissionRepository.findOneById(id);
        target.delete();
        permissionRepository.insertOrUpdate(target);
        return true;
    }

    @Override
    public PermissionResponse update(Long id, PostPutPermissionRequest data) {
        Permission target = permissionRepository.findOneById(id);

        target.update(target.getName(), data.getName());
        permissionRepository.insertOrUpdate(target);
        return target.convertSelf();
    }

    @Override
    public List<GetDisplay> getDisplay() {

        return permissionRepository.findAllWithFilter(List.of()).stream()
                .map(permission -> convertToDisplay(permission)).collect(Collectors.toList());
    }

    private GetDisplay convertToDisplay(Permission data) {
        GetDisplay result = new GetDisplay();

        result.setLabel(data.getName());
        result.setValue(data.getId());
        result.setExtra(data.getParent() != null ? data.getParent().getId() : null);

        return result;
    }

    @Override
    public List<GetDisplay> getDisplayWithKey() {
        return permissionRepository.findAllWithFilter(List.of()).stream().map(perm -> convertToDisplayWithKey(perm))
                .collect(Collectors.toList());
    }

    private GetDisplay convertToDisplayWithKey(Permission data) {
        GetDisplay result = new GetDisplay();

        result.setLabel(data.getName() + " (" + data.getKey() + ")");
        result.setValue(data.getId());
        result.setExtra(data.getParent() != null ? data.getParent().getId() : null);

        return result;
    }

}
