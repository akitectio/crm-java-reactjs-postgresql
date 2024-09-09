package io.akitect.crm.exception;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ServerException extends AbstractException {
    private String message = "INTERNAL SERVER ERROR";
    private int errorStatus = 500;
    private Map<String, ?> detail = new HashMap<>();
}