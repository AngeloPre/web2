package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "tbl_funcionario")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Funcionario extends Usuario {
    @Column(nullable = false)
    private LocalDate aniversario;

    public Funcionario(String cpf, String nome, String email, String senha,
            LocalDate aniversario) {
        super(cpf, nome, email, RoleUsuario.FUNCIONARIO, senha);
        this.aniversario = aniversario;
    }
    
}