package br.ufpr.api.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.NotNull;

import br.ufpr.api.model.enums.StatusConserto;

public record EtapaCreateDTO(
    @NotNull StatusConserto status,
    BigDecimal valorOrcamento,      // obrigatório se status é ORCADA
    String motivoRejeicao,          // obrigatório se status é REJEITADA
    Integer funcionarioDestinoId,   // obrigatório se status é REDIRECIONADA
    String descricaoManutencao,     // obrigatório se status é ARRUMADA
    String orientacoesCliente      // opcional em ARRUMADA
) {}
