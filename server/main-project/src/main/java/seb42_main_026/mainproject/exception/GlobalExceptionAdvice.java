package seb42_main_026.mainproject.exception;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {


    // Method Parameter Exception
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e){
        log.error("handleConstraintViolationException", e);

        final ErrorResponse errorResponse = ErrorResponse.of(e.getConstraintViolations());

        return errorResponse;
    }


    // Validation Exception
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        log.error("handleMethodArgumentNotValidException", e);

        final ErrorResponse errorResponse = ErrorResponse.of(e.getBindingResult());

        return errorResponse;

    }


    // Http Request Method Not Supported Exception
    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e){
        log.error("handleHttpRequestMethodNotSupportedException", e);

        final ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return errorResponse;

    }


    // Custom Exception
    @ExceptionHandler
    public ResponseEntity handleCustomException(CustomException e){
        log.error("handleCustomException", e);

        final ErrorResponse errorResponse = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity(errorResponse, e.getExceptionCode().getHttpStatus());

    }

    // etc Exeption
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(Exception e){
        log.error("handleException", e);
        final ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);

        return errorResponse;
    }

}
