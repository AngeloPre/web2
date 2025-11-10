package br.ufpr.api.dto;

import jakarta.validation.constraints.NotBlank;

public record ChamadoUpdateDTO(
    @NotBlank String categoriaNome,
    @NotBlank String descricaoEquipamento,
    @NotBlank String descricaoFalha
){}
