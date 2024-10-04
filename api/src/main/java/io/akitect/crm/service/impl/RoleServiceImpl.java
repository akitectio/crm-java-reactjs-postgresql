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

import io.akitect.crm.dto.request.GetCommonFilterRequest;
import io.akitect.crm.dto.request.PostPutRoleRequest;
import io.akitect.crm.dto.response.GetDisplay;
import io.akitect.crm.dto.response.PaginateRoleResponse;
import io.akitect.crm.dto.response.RoleResponse;
import io.akitect.crm.dto.response.UserResponse;
import io.akitect.crm.exception.BadRequestException;
import io.akitect.crm.model.Permission;
import io.akitect.crm.model.Role;
import io.akitect.crm.repository.RoleRepository;
import io.akitect.crm.service.PermissionService;
import io.akitect.crm.service.RoleService;
import io.akitect.crm.service.UserService;
import io.akitect.crm.utils.FilterMap;
import io.akitect.crm.utils.JwtHelper;
import io.akitect.crm.utils.enums.FilterOperator;
import jakarta.transaction.Transactional;
import jakarta.transaction.Transactional.TxType;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PermissionService permissionService;

    @Autowired
    UserService userService;

    @Override
    @Transactional
    public RoleResponse getOneById(Long id) {

        return convertToResponse(roleRepository.findOneById(id));
    }

    private RoleResponse convertToResponse(Role data) {
        return RoleResponse.builder().id(data.getId()).name(data.getName()).description(data.getDescription())
                .createdAt(data.getCreatedAt()).updatedAt(data.getUpdatedAt()).deletedAt(data.getDeletedAt())
                .isDefault(data.getIsDefault())
                .permissions(data.getPermissions().stream().map(Permission::convertSelfWithoutChildren)
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    @Transactional
    public RoleResponse insert(PostPutRoleRequest data) {

        if (data.getPermissionIds() == null || data.getPermissionIds().size() == 0) {
            throw new BadRequestException("Permission list can not be empty", null);
        }

        Role newRole = new Role();
        newRole.setName(data.getName());
        newRole.setDescription(data.getDescription());
        newRole.setIsDefault(data.getIsDefault() != null ? data.getIsDefault() : false);

        try {
            UserResponse createdBy = userService.getUserById(Long.parseLong(JwtHelper.getCurrentUserId()));
            newRole.setCreatedByName(createdBy.getFirstName() + " " + createdBy.getLastName());
        } catch (Exception e) {
            newRole.setCreatedByName("System");
        }

        Set<Permission> permissions = permissionService.getById(data.getPermissionIds()).stream()
                .collect(Collectors.toSet());
        List<Permission> childPermission = new ArrayList<>();

        for (Permission permission : permissions) {
            childPermission.addAll(permission.getAllChildren());
        }

        permissions.addAll(childPermission);

        newRole.setPermissions(permissions.stream().collect(Collectors.toList()));

        if (data.getIsDefault() != null && data.getIsDefault()) {
            List<Role> oldDefaultRole = roleRepository
                    .findWithConditions(List.of(new FilterMap("isDefault", "isDefault", true, FilterOperator.EQUAL)));
            if (oldDefaultRole.size() > 0) {
                oldDefaultRole.stream().forEach(role -> role.setIsDefault(false));
                roleRepository.saveAll(oldDefaultRole);
            }

        }

        Role result = roleRepository.insertOrUpdate(newRole);

        return convertToResponse(result);
    }

    @Override
    @Transactional
    public Page<PaginateRoleResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy, Direction order,
            List<GetCommonFilterRequest> filter) {

        return roleRepository.paginatedWithConditions(pageRequest, getFilters(filter));
    }

    private List<FilterMap> getFilters(List<GetCommonFilterRequest> filter) {
        List<FilterMap> filters = new ArrayList<>();
        if (filter != null)
            for (GetCommonFilterRequest needToFilter : filter) {

                if (List.of("name").contains(needToFilter.getKey()))
                    needToFilter.setValue("%" + needToFilter.getValue() + "%");

                filters.add(new FilterMap(needToFilter.getKey(), needToFilter.getKey(), needToFilter.getValue(),
                        needToFilter.getOperator()));
            }
        return filters;
    }

    @Override
    @Transactional(value = TxType.REQUIRED)
    public List<String> getPermissionByRole(Long id) {
        Set<Long> ids = roleRepository.findOneById(id).getPermissions().stream().map(x -> x.getId())
                .collect(Collectors.toSet());
        return permissionService.getById(ids).stream().map(Permission::getKey).collect(Collectors.toList());
    }

    @Override
    public RoleResponse updateRole(PostPutRoleRequest data, Long id) {
        if (data.getPermissionIds() == null || data.getPermissionIds().size() == 0) {
            throw new BadRequestException("Permission list can not be empty", null);
        }

        Role target = roleRepository.findOneById(id);

        if (data.getName() != null)
            target.setName(data.getName());
        if (data.getDescription() != null)
            target.setDescription(data.getDescription());
        if (data.getIsDefault() != null)
            target.setIsDefault(data.getIsDefault());

        Set<Permission> permissions = permissionService.getById(data.getPermissionIds()).stream()
                .collect(Collectors.toSet());
        List<Permission> childPermission = new ArrayList<>();

        for (Permission permission : permissions) {
            childPermission.addAll(permission.getAllChildren());
        }

        permissions.addAll(childPermission);

        target.setPermissions(permissions.stream().collect(Collectors.toList()));

        return convertToResponse(roleRepository.insertOrUpdate(target));
    }

    @Override
    public void deleteRoleById(Long id) {
        Role oldRole = roleRepository.findOneById(id);

        oldRole.remove();

        roleRepository.insertOrUpdate(oldRole);
    }

    @Override
    public List<GetDisplay> getAll() {
        return roleRepository.findWithConditions(List.of()).stream().map(x -> x.toDisplay())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<RoleResponse> getRoleByPermissionId(Long id) {
        return roleRepository.findRoleByPermissionId(id).stream().map(role -> convertToResponse(role))
                .collect(Collectors.toList());
    }

}
