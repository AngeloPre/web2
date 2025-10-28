package br.ufpr.api.dto;

import java.time.Instant;

public record EquipamentoDTO(
    Integer categoryId,
    String name,
    String slug,
    Long baseValue,
    Boolean status,
    Instant createdAt
) 
{}
