package br.ufpr.api.dto;

import br.ufpr.api.model.enums.StatusConserto;
import jakarta.validation.constraints.NotBlank;

public record ChamadoUpdateDTO(
    @NotBlank String categoriaNome,
    @NotBlank String descricaoEquipamento,
    @NotBlank String descricaoFalha,
    StatusConserto statusConserto
){}
