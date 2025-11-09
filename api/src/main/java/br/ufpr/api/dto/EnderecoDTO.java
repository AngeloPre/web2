package br.ufpr.api.dto;

public record EnderecoDTO(
    String cep,
    String logradouro,
    String complemento,
    String numero,
    String bairro,
    String cidade,
    String uf
) {}
