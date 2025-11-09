package br.ufpr.api.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record OrcamentoDTO(
    @NotNull BigDecimal valor,
    String comentario
) {}
