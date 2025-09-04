package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "tbl_cliente")
public class Client extends User {
    @Column(nullable = false)
    private String phone;

    //TODO endereço

    public Client() {
        this.setRole(UserRole.CLIENT);
    }
}
