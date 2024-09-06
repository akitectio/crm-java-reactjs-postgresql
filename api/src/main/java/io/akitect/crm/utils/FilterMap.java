package io.akitect.crm.utils;

import io.akitect.crm.utils.enums.FilterOperator;

public class FilterMap {
    String fieldName;
    String paramName;
    Object value;
    FilterOperator operator;

    public FilterMap(String fieldName, String paramName, Object value, FilterOperator operator) {
        this.fieldName = fieldName;
        this.paramName = paramName;
        this.value = value;
        this.operator = operator;
    }
};
