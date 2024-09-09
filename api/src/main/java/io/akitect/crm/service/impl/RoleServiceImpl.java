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

import io.akitect.crm.dto.request.GetRoleRequest;
import io.akitect.crm.dto.request.PostPutRoleRequest;
import io.akitect.crm.dto.response.RoleResponse;
import io.akitect.crm.exception.BadRequestException;
import io.akitect.crm.model.Permission;
import io.akitect.crm.model.Role;
import io.akitect.crm.repository.RoleRepository;
import io.akitect.crm.service.PermissionService;
import io.akitect.crm.service.RoleService;
import io.akitect.crm.utils.FilterMap;
import jakarta.transaction.Transactional;
import jakarta.transaction.Transactional.TxType;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PermissionService permissionService;

    @Override
    @Transactional
    public RoleResponse getOneById(Long id) {

        return convertToResponse(roleRepository.findOneById(id));
    }

    private RoleResponse convertToResponse(Role data) {
        return RoleResponse.builder().id(data.getId()).name(data.getName()).active(data.getActive())
                .createdAt(data.getCreatedAt()).updatedAt(data.getUpdatedAt()).deletedAt(data.getDeletedAt()).build();
    }

    @Override
    @Transactional
    public RoleResponse insert(PostPutRoleRequest data) {
        if (data.getPermissionIds() == null || data.getPermissionIds().size() == 0) {
            throw new BadRequestException("Permission list can not be empty", null);
        }

        Role newRole = Role.builder()
                .name(data.getName())
                .build();

        newRole.setPermissions(permissionService.getById(data.getPermissionIds()).stream().collect(Collectors.toSet()));

        return convertToResponse(roleRepository.insertOrUpdate(newRole));
    }

    @Override
    public Page<RoleResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy, Direction order,
            GetRoleRequest filter) {

        return roleRepository.paginatedWithConditions(pageRequest, getFilters(filter));
    }

    private List<FilterMap> getFilters(GetRoleRequest filter) {
        List<FilterMap> filters = new ArrayList<>();

        return filters;
    }

    @Override
    @Transactional(value = TxType.REQUIRED)
    public List<String> getPermissionByRole(Long id) {
        Set<Long> ids = roleRepository.findOneById(id).getPermissions().stream().map(Permission::getId)
                .collect(Collectors.toSet());
        return permissionService.getById(ids).stream().map(Permission::getKey).collect(Collectors.toList());
    }

}
