package br.ufpr.api.model.data;

import br.ufpr.api.model.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

//classe para popular o objeto "principal" do token de autenticação do spring security
@AllArgsConstructor
@Data
public class UserDescription {
    UUID userId;
    UserRole userRole;
}
