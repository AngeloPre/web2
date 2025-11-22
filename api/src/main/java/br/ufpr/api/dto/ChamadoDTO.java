package br.ufpr.api.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record ChamadoDTO(
    Integer id,
    String cliente,
    String clienteEmail,
    String funcionario,
    String funcionarioEmail,
    String categoriaNome,
    String descricaoEquipamento,
    String descricaoFalha,
    BigDecimal precoBase,
    String comentario,
    String status,
    Instant dataCriacao,
    Instant dataResposta,
    BigDecimal orcamentoValor,
    String slug,
    String descricaoManutencao,
    String orientacoesManutencao
) {}
