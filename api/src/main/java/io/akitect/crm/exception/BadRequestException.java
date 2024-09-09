package io.akitect.crm.exception;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class BadRequestException extends AbstractException {
    public String message = "INVALID DATA";
    public int errorStatus = 400;
    public Map<String, ?> detail = new HashMap<>();

    public BadRequestException(String message, Map<String, ?> detail) {
        this.message = message;
        this.detail = detail;
        this.errorStatus = 400;
    };
}
