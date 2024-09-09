package io.akitect.crm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.akitect.crm.dto.request.GetRoleRequest;
import io.akitect.crm.dto.request.PostPutRoleRequest;
import io.akitect.crm.dto.response.PaginatedResponse;
import io.akitect.crm.dto.response.RoleResponse;
import io.akitect.crm.service.RoleService;
import io.akitect.crm.utils.PageHelper;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping("/paginated")
    public ResponseEntity<PaginatedResponse<RoleResponse>> paginated(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "items_per_page", defaultValue = "10") int perPage,
            @RequestParam(name = "sort_by", defaultValue = "id") String sortBy,
            @RequestParam(name = "order", defaultValue = "ASC") Direction order,
            @ModelAttribute() GetRoleRequest filter) {
        return ResponseEntity
                .ok(PageHelper.convertResponse(
                        roleService.paginatedWithConditions(PageRequest.of(page, perPage), sortBy, order, filter)));
    }

    @PostMapping("")
    public ResponseEntity<RoleResponse> postRole(@RequestBody PostPutRoleRequest data) {
        return ResponseEntity.ok(roleService.insert(data));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleResponse> getRoleDetail(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getOneById(id));
    }

    @GetMapping("/{id}/permission-keys")
    public ResponseEntity<List<String>> getPermissionList(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getPermissionByRole(id));
    }

}
