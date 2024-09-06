package io.akitect.crm.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginatedResponse<T> {
    private Integer page;
    private Integer totalPage;
    private Integer total;
    private List<T> results;
}
