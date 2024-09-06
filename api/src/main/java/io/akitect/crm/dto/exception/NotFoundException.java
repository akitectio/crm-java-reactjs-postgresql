package io.akitect.crm.dto.exception;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NotFoundException extends AbstractException {
    public String message = "DATA NOT FOUND";
    public int errorStatus = 404;
    public Map<String, ?> detail = new HashMap<>();
}
