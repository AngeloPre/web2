package br.ufpr.api.model.response;

import br.ufpr.api.model.entity.Client;
import br.ufpr.api.model.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClientAuthResponse {
    TokenResponse accessToken;
    UserRole userRole;
    Client client;

    public ClientAuthResponse(TokenResponse accessToken, Client client) {
        this.accessToken = accessToken;
        this.userRole = UserRole.CLIENT;
        this.client = client;
    }
}
