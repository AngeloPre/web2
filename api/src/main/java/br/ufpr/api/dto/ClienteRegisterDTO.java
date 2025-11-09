package br.ufpr.api.dto;

public record ClienteRegisterDTO(
    String nome,
    String email,
    String cpf,
    String telefone,
    EnderecoDTO endereco
) {}
