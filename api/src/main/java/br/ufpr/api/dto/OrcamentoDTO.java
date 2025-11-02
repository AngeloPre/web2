package br.ufpr.api.dto;

import java.math.BigDecimal;

public record OrcamentoDTO(
    Long id,
    BigDecimal valor
) {}
