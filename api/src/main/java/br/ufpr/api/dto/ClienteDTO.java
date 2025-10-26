package br.ufpr.api.dto;

public record ClienteDTO(
    Integer id,
    String nome,
    String email,
    String telefone,
    String cpf,
    EnderecoDTO endereco
) {}
