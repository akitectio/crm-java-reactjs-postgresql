package io.akitect.crm.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostPutPermissionRequest {
    private String title;
    private String description;
    private String key;
    private Long parentId;
}
