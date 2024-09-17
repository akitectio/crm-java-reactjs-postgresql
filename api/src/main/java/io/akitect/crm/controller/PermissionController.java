package io.akitect.crm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.akitect.crm.dto.request.GetPermissionRequest;
import io.akitect.crm.dto.request.PostPutPermissionRequest;
import io.akitect.crm.dto.response.GetDisplay;
import io.akitect.crm.dto.response.PaginatePermissionResponse;
import io.akitect.crm.dto.response.PaginatedResponse;
import io.akitect.crm.dto.response.PermissionResponse;
import io.akitect.crm.service.PermissionService;
import io.akitect.crm.utils.PageHelper;

@RestController
@RequestMapping("/permissions")
public class PermissionController {
    @Autowired
    PermissionService permissionService;

    @GetMapping("/{id}")
    public ResponseEntity<PermissionResponse> getPermission(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.getOneById(id));
    }

    @PostMapping("")
    public ResponseEntity<PermissionResponse> postPermission(@RequestBody PostPutPermissionRequest data) {
        return ResponseEntity.ok(permissionService.insert(data));
    }

    @GetMapping("/paginated")
    public ResponseEntity<PaginatedResponse<PaginatePermissionResponse>> paginated(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "items_per_page", defaultValue = "10") int perPage,
            @RequestParam(name = "sort_by", defaultValue = "id") String sortBy,
            @RequestParam(name = "order", defaultValue = "ASC") Direction order,
            @ModelAttribute() GetPermissionRequest filter) {
        return ResponseEntity
                .ok(PageHelper.convertResponse(permissionService.paginatedWithConditions(PageRequest.of(page, perPage),
                        sortBy, order, filter)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PermissionResponse> update(@PathVariable Long id,
            @RequestBody PostPutPermissionRequest data) {

        return ResponseEntity.ok(permissionService.update(id, data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.delete(id));
    }

    @GetMapping("/display")
    public ResponseEntity<List<GetDisplay>> getDisplayPermission(){
        return ResponseEntity.ok(permissionService.getDisplay());
    }

}
