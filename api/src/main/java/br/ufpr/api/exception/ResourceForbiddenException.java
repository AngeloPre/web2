package br.ufpr.api.exception;

import org.springframework.http.HttpStatus;

public class ResourceForbiddenException extends ApiException{

    public ResourceForbiddenException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }

}
