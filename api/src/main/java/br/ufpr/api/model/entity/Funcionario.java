package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "tbl_funcionario")
public class Funcionario extends Usuario {
    @Column(nullable = false)
    private Date aniversario;

    public Funcionario() {
        this.setRole(RoleUsuario.FUNCIONARIO);
    }
}