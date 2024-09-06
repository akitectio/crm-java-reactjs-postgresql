package io.akitect.crm.dto.exception;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class BadRequestException extends AbstractException {
    public String message = "INVALID DATA";
    public int errorStatus = 400;
    public Map<String, ?> detail = new HashMap<>();
}
