package br.ufpr.api.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FuncionarioCreateUpdateDTO(
    @NotBlank String nome,
    @NotBlank String email,
    @NotBlank String senha,
    @NotNull LocalDate dataNascimento
) {}