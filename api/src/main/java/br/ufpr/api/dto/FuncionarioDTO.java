package br.ufpr.api.dto;

import java.time.LocalDate;

public record FuncionarioDTO(
    Integer id,
    String nome,
    String email,
    LocalDate dataNascimento
) {}
