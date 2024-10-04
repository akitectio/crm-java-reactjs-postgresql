package io.akitect.crm.dto.request;

import io.akitect.crm.utils.enums.FilterOperator;
import lombok.Data;

@Data
public class GetCommonFilterRequest {
    private String key;
    private FilterOperator operator;
    private Object value;
}
