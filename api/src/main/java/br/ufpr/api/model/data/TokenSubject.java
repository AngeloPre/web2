package br.ufpr.api.model.data;

import br.ufpr.api.model.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@Data
public class TokenSubject implements Serializable {
    UUID userId;
    UserRole userRole;
}
