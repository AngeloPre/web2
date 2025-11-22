package br.ufpr.api.dto;

import java.math.BigDecimal;
import java.util.List;

public record RelatorioDTO(
    String tipo,
    
    // AGREGADOS
    Integer totalChamados,
    Integer totalFinalizados,
    BigDecimal receitaTotal,
    BigDecimal ticketMedio,
    
    // TABELA
    List<RelatorioDetalhe> detalhes
) {
    // CONTEUDO TABELA
    public record RelatorioDetalhe(
        String chave,
        Integer chamados,
        Integer finalizados,
        BigDecimal receita,
        Double taxaConversao, // PERCENTUAL
        BigDecimal ticketMedio
    ) {}
}