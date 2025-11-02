package br.ufpr.api.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record ChamadoDTO(
    Integer id,
    ClienteDTO cliente,
    FuncionarioDTO funcionario,
    String categoriaNome,
    String descricaoEquipamento,
    String descricaoFalha,
    BigDecimal precoBase,
    String comentario,
    String status,
    Instant dataCriacao,
    Instant dataResposta,
    List<EtapaHistoricoDTO> etapas,
    OrcamentoDTO orcamento
) {}
