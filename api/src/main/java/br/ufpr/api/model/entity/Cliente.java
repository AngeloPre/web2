package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "tbl_cliente")
@NoArgsConstructor
public class Cliente extends Usuario {
    @Column(nullable = false)
    private String telefone;

    public Cliente(String cpf, String nome, String email, String senha, String telefone) {
        super(cpf, nome, email, RoleUsuario.CLIENTE, senha);
        this.telefone = telefone;
    }
}