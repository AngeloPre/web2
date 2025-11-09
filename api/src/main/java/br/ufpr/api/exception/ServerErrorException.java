package br.ufpr.api.exception;

import org.springframework.http.HttpStatus;

public class ServerErrorException extends ApiException{

    public ServerErrorException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
