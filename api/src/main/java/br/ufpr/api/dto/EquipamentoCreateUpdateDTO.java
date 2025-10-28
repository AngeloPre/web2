package br.ufpr.api.dto;

import jakarta.validation.constraints.NotNull;

public record EquipamentoCreateUpdateDTO(
    @NotNull String name,
    @NotNull Long baseValue,
    Boolean status
)
{}
