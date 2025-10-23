package br.ufpr.api.model.entity;

import java.time.LocalDate;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@Table(name = "tbl_funcionario")
@PrimaryKeyJoinColumn(name = "user_id")
public class Funcionario extends Usuario {

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    public Funcionario(){
        this.setRole(RoleUsuario.FUNCIONARIO);
    }
    
    //GETTERS E SETTERS

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

}

