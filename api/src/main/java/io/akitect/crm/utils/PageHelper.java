package io.akitect.crm.utils;

import org.springframework.data.domain.Page;

import io.akitect.crm.dto.response.PaginatedResponse;

public class PageHelper {
    public static <T> PaginatedResponse<T> convertResponse(final Page<T> page) {
        PaginatedResponse<T> result = new PaginatedResponse<T>();
        result.setPage(page.getNumber());
        result.setResults(page.getContent());
        result.setTotal((int) page.getTotalElements());
        result.setTotalPage(page.getTotalPages());
        return result;
    }

}
