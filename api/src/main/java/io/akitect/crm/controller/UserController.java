package io.akitect.crm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.akitect.crm.dto.request.GetCommonFilterRequest;
import io.akitect.crm.dto.request.UserRequest;
import io.akitect.crm.dto.request.UserRequestPut;
import io.akitect.crm.dto.response.PaginatedResponse;
import io.akitect.crm.dto.response.UserResponse;
import io.akitect.crm.service.UserService;
import io.akitect.crm.utils.PageHelper;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest userRequest) {
        UserResponse createdUser = userService.createUser(userRequest);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id,
            @Valid @RequestBody UserRequestPut userRequestPut) {
        UserResponse updatedUser = userService.updateUser(id, userRequestPut);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/paginate")
    public ResponseEntity<PaginatedResponse<UserResponse>> paginateUser(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "items_per_page", defaultValue = "10") int perPage,
            @RequestParam(name = "sort_by", defaultValue = "id") String sortBy,
            @RequestParam(name = "order", defaultValue = "ASC") Direction order,
            @RequestBody(required = false) List<GetCommonFilterRequest> filter) {

        PaginatedResponse<UserResponse> result = PageHelper
                .convertResponse(
                        userService.paginatedWithConditions(PageRequest.of(page, perPage), sortBy, order, filter));

        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}/remove-super")
    public ResponseEntity<UserResponse> removeSuper(@PathVariable Long id) {

        return ResponseEntity.ok(userService.removeSuper(id));
    }

    @PutMapping("/{id}/set-role")
    public ResponseEntity<UserResponse> setRole(@PathVariable Long id, @RequestParam Long roleId) {

        return ResponseEntity.ok(userService.setRole(id, roleId));
    }

    public record RequestChangePassword(String oldPassword, String newPassword) {
    }

    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody RequestChangePassword data) {
        userService.changePassword(id, data.oldPassword(), data.newPassword());
        return ResponseEntity.ok("Change password successfully");
    }

}
