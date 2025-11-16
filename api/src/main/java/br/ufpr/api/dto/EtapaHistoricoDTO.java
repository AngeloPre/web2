package br.ufpr.api.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record EtapaHistoricoDTO(
        Long id,
        String status,          // StatusConserto como String (name())
        String comentario,
        Instant dataCriacao,
        FuncionarioDTO funcionario,
        String motivoRejeicao,
        BigDecimal orcamento
) {}
