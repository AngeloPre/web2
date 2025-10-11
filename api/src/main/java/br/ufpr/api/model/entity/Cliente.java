package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "tbl_cliente")
public class Cliente extends Usuario {
    @Column(nullable = false)
    private String telefone;

    public Cliente() {
        this.setRole(RoleUsuario.CLIENTE);
    }

    @Override
    public String getPassword() {
        return this.getPassword();
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }
}