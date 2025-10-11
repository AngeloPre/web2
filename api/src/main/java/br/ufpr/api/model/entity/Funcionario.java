package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Entity
@Data
@Table(name = "tbl_funcionario")
@EqualsAndHashCode(callSuper = true)
public class Funcionario extends Usuario {
    @Column(nullable = false)
    private Date aniversario;

    public Funcionario() {
        this.setRole(RoleUsuario.FUNCIONARIO);
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