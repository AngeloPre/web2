package br.ufpr.api.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record ChamadoDTO(
    Integer id,
    String cliente,
    String funcionario,
    String categoriaNome,
    String descricaoEquipamento,
    String descricaoFalha,
    BigDecimal precoBase,
    String comentario,
    String status,
    Instant dataCriacao,
    Instant dataResposta,
    //List<EtapaHistoricoDTO> etapas,
    BigDecimal orcamentoValor
) {}
