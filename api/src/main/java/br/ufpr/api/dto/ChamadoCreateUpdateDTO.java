package br.ufpr.api.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ChamadoCreateUpdateDTO(
    @NotNull Integer clienteId,
    Integer funcionarioId,                 // opcional
    @NotNull Integer categoriaId,
    @NotBlank String descricaoEquipamento,
    @NotBlank String descricaoFalha,
    @NotNull @DecimalMin("0.00") BigDecimal precoBase,
    String comentario) {

}
