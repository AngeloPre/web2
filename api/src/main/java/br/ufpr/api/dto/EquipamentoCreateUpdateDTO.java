package br.ufpr.api.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public record EquipamentoCreateUpdateDTO(
    @NotNull String name,
    @NotNull BigDecimal baseValue,
    Boolean status,
    @NotNull String description
) {

}
