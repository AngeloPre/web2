package br.ufpr.api.dto;

import jakarta.validation.constraints.NotBlank;

public record ChamadoPatchDTO(
    @NotBlank String categoriaNome,
    @NotBlank String descricaoEquipamento,
    @NotBlank String descricaoFalha
){}
