// package io.akitect.crm.utils;

// import java.util.Map;

// import org.springframework.http.HttpStatusCode;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.ControllerAdvice;
// import org.springframework.web.bind.annotation.ExceptionHandler;
// import org.springframework.web.context.request.WebRequest;

// import io.akitect.crm.dto.exception.ServerException;
// import lombok.Data;

// @ControllerAdvice
// public class GlobalExceptionHandler {

// @Data
// class GlobalExcpetionReturn {
// public String message;
// private int errorStatus;
// public Map<String, ?> detail;
// }

// @ExceptionHandler(RuntimeException.class)
// public ResponseEntity<GlobalExcpetionReturn> handleException(Exception
// exception, WebRequest webRequest) {

// Map<String, String> errorDetail = Map.of("exception_message",
// exception.getMessage());
// ServerException serverException = new ServerException("Internal server
// error", 500, errorDetail);
// GlobalExcpetionReturn result = new GlobalExcpetionReturn();
// result.setMessage(serverException.getMessage());
// result.setDetail(serverException.getDetail());
// result.setErrorStatus(serverException.getErrorStatus());
// ResponseEntity<GlobalExcpetionReturn> entity = new
// ResponseEntity<GlobalExcpetionReturn>(result,
// HttpStatusCode.valueOf(serverException.getErrorStatus()));
// return entity;
// }
// }
