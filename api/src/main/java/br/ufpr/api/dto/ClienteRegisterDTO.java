package br.ufpr.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClienteRegisterDTO (
    @NotBlank String nome,
    @NotBlank String cpf,
    @NotBlank @Email String email,
    @NotBlank String telefone,
    @NotBlank String cep,
    @NotBlank String logradouro,
    String complemento, 
    @NotBlank String bairro,
    @NotBlank String cidade,
    @NotBlank String uf,
    @NotBlank String numero

){
    
}
