package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@Table(name = "tbl_cliente")
@PrimaryKeyJoinColumn(name = "user_id")
public class Cliente extends Usuario {

    @Column(name = "cpf", length = 11, nullable = false, unique = true)
    private String cpf;

    @Column(name = "telefone", length = 15, nullable = false)
    private String telefone;

    @Embedded
    private Endereco endereco;

    public Cliente(){
        this.setRole(RoleUsuario.CLIENTE);
    }

    //GETTERS E SETTERS

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

}

