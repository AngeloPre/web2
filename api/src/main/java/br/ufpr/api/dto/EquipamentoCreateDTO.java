package br.ufpr.api.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public record EquipamentoCreateDTO(
    @NotNull String name,
    @NotNull BigDecimal baseValue,
    @NotNull String description
      ) {}

