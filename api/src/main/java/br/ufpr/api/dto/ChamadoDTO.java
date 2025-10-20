package br.ufpr.api.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record ChamadoDTO(
    Integer id,
    String slug,
    String clienteNome,
    String funcionarioNome,
    String categoriaNome,
    String descricaoEquipamento,
    String descricaoFalha,
    BigDecimal precoBase,
    String comentario,
    String status,
    Instant dataCriacao,
    Instant dataResposta) {

}
