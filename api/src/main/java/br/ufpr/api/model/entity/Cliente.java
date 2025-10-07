package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tbl_cliente")
public class Cliente extends Usuario {
    @Column(nullable = false)
    private String telefone;

    //TODO endereço

    public Cliente() {
        this.setRole(RoleUsuario.CLIENTE);
    }
}