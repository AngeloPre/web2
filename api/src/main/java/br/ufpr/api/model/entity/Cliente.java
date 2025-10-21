package br.ufpr.api.model.entity;

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
    @Column(nullable = false, length = 11)
    private String cpf;
    
    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String logradouro;

    @Column (nullable = true)
    private String complemento;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade; 

    @Column(nullable = false, length = 2) 
    private String uf;

    @Column(nullable = false)
    private String numero;


}