package io.akitect.crm.dto.response;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import io.akitect.crm.model.Permission;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(value = Include.ALWAYS)
public class PermissionResponse {
    private Long id;
    private String name;
    private String key;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp deletedAt;
    @Setter(value = AccessLevel.NONE)
    private List<PermissionResponse> children;

    public void setChildren(List<Permission> data) {
        this.children = data != null
                ? data.stream().map(Permission::convertSelf).collect(Collectors.toList())
                : new ArrayList<>();
    }
}
