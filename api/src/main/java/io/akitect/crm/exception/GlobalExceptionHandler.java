package io.akitect.crm.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ControllerAdvice
public class GlobalExceptionHandler {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class GlobalExceptionResponse {
        private String message;
        private int status;
        private Map<String, ?> details;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<GlobalExceptionResponse> handleServerException(ServerException ex) {
        GlobalExceptionResponse exception = new GlobalExceptionResponse();
        exception.setDetails(ex.getDetail());
        exception.setMessage(ex.getMessage());
        exception.setStatus(ex.getErrorStatus());
        return new ResponseEntity<>(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, Object> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage(); // Directly get the validation message

            Map<String, String> errorDetails = new HashMap<>();
            errorDetails.put("message", errorMessage);

            errors.put(fieldName, errorDetails);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
