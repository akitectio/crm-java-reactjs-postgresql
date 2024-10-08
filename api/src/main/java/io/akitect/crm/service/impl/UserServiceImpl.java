package io.akitect.crm.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.akitect.crm.dto.request.GetCommonFilterRequest;
import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.request.UserRequestPut;
import io.akitect.crm.dto.response.UserResponse;
import io.akitect.crm.model.Role;
import io.akitect.crm.model.User;
import io.akitect.crm.repository.RoleRepository;
import io.akitect.crm.repository.UserRepository;
import io.akitect.crm.service.UserService;
import io.akitect.crm.utils.FilterMap;
import io.akitect.crm.utils.converters.StringToTimestamp;
import io.akitect.crm.utils.enums.FilterOperator;
import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public UserResponse createUser(UserRequest userRequest) {
        User user = mapToEntity(userRequest);
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        // user.setStatus(StatusOfUser.ACTIVATED);
        userRepository.create(user);
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserRequestPut userRequestPut) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Update user entity with values from userRequest
        user = putUser(userRequestPut, user);
        userRepository.update(user);
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.remove();
        userRepository.update(user);
    }

    private User mapToEntity(UserRequest userRequest) {
        User user = new User();
        return getUser(userRequest, user);
    }

    private User getUser(UserRequest userRequest, User user) {

        if (userRequest.getRoleId() != null)
            user.setRoleId(userRequest.getRoleId());
        else
            user.setRoleId(roleRepository.findDefault().getId());

        user.setEmail(userRequest.getEmail());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setUsername(userRequest.getUsername());
        user.setAvatarId(userRequest.getAvatarId());
        user.setSuperUser(userRequest.getSuperUser());
        user.setManageSupers(userRequest.getManageSupers());
        return user;
    }

    private User putUser(UserRequestPut userRequest, User user) {
        user.setEmail(userRequest.getEmail());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        return user;
    }

    private UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setUsername(user.getUsername());
        response.setAvatarId(user.getAvatarId());
        response.setSuperUser(user.getSuperUser());
        response.setRoleId(user.getRoleId());
        response.setManageSupers(user.getManageSupers());
        response.setEmailVerifiedAt(user.getEmailVerifiedAt());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setLastLogin(user.getLastLogin());
        response.setActive(user.getActive());

        Role role = roleRepository.findOneById(user.getRoleId());

        response.setRoleName(role.getName());

        return response;
    }

    @Transactional
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public Page<UserResponse> paginatedWithConditions(PageRequest pageRequest, String sortBy, Direction order,
            List<GetCommonFilterRequest> filter) {
        pageRequest = pageRequest.withSort(order, sortBy);
        Page<UserResponse> result = userRepository.paginatedWithConditions(pageRequest, getFilters(filter));
        Set<Long> roleIds = result.getContent().stream().map(x -> x.getRoleId()).filter(x -> x != null)
                .collect(Collectors.toSet());

        Map<Long, String> roleMapper = roleRepository.findById(roleIds).stream()
                .collect(Collectors.toMap(Role::getId, Role::getName));
        result.getContent().stream().forEach(user -> {
            if (user.getRoleId() != null)
                user.setRoleName(roleMapper.get(user.getRoleId()));
        });

        return result;
    }

    private List<FilterMap> getFilters(List<GetCommonFilterRequest> filter) {
        List<FilterMap> filters = new ArrayList<>();
        if (filter != null)
            for (GetCommonFilterRequest needToFilter : filter) {

                if (List.of("email", "firstName", "lastName", "username").contains(needToFilter.getKey())
                        && List.of(FilterOperator.ILIKE, FilterOperator.LIKE).contains(needToFilter.getOperator()))
                    needToFilter.setValue("%" + needToFilter.getValue() + "%");
                if (List.of("createdAt", "updatedAt", "lastLogin").contains(needToFilter.getKey()))
                    needToFilter.setValue(StringToTimestamp.convert((String) needToFilter.getValue(), null));

                filters.add(new FilterMap(needToFilter.getKey(), needToFilter.getKey(), needToFilter.getValue(),
                        needToFilter.getOperator()));
            }
        return filters;
    }

    @Override
    @Transactional
    public UserResponse removeSuper(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        assert user.getSuperUser() : "This user is not super";

        user.removeSuper();

        return mapToResponse(userRepository.update(user));
    }

    @Override
    @Transactional
    public UserResponse setRole(Long id, Long roleId) {
        User target = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        Role roleTarget = roleRepository.findOneById(roleId);
        target.setRoleId(roleTarget.getId());

        return mapToResponse(userRepository.update(target));
    }

    @Override
    @Transactional
    public UserResponse changePassword(Long id, String oldPassword, String newPassword) {
        User target = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(oldPassword, target.getPassword()))
            throw new RuntimeException("Wrong password");
        target.setPassword(passwordEncoder.encode(newPassword));

        return mapToResponse(userRepository.update(target));
    }

    @Override
    public UserResponse changeAvatar(Long id, Long avatarId) {
        // TODO Auto-generated method stub
        return null;
    }
}
