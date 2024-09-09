package io.akitect.crm.exception;

import java.util.HashMap;
import java.util.Map;

public abstract class AbstractException extends RuntimeException {
    public String message = "INTERNAL SERVER ERROR";
    public int errorStatus = 500;
    public Map<String, ?> detail = new HashMap<>();
}
