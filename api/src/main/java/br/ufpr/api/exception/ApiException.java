package br.ufpr.api.exception;

import org.springframework.http.HttpStatus;

public class ApiException extends RuntimeException{
    private final HttpStatus httpStatus;
    
    public ApiException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus geHttpStatus(){
        return this.httpStatus;
    }
}
