package io.akitect.crm.dto.request;

import lombok.Data;

@Data
public class GetPermissionRequest {
    private String name;
    private String description;
    private String key;
}
