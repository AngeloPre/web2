package br.ufpr.api.service;

import br.ufpr.api.dto.RelatorioDTO;
import br.ufpr.api.dto.RelatorioDTO.RelatorioDetalhe;
import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.model.enums.StatusConserto;
import br.ufpr.api.repository.ChamadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RelatorioService {
    
    @Autowired
    private ChamadoRepository chamadoRepository;
    
    public RelatorioDTO gerarRelatorio(String tipo, LocalDate dataInicio, LocalDate dataFim) {
        List<Chamado> chamados = buscarChamados(dataInicio, dataFim);
        
        if ("PERIODO".equalsIgnoreCase(tipo)) {
            return gerarRelatorioPorPeriodo(chamados, dataInicio, dataFim);
        } else if ("CATEGORIA".equalsIgnoreCase(tipo)) {
            return gerarRelatorioPorCategoria(chamados);
        } else {
            throw new IllegalArgumentException("Tipo de relatório inválido: " + tipo);
        }
    }
    
    private List<Chamado> buscarChamados(LocalDate dataInicio, LocalDate dataFim) {
        List<Chamado> todos = (List<Chamado>) chamadoRepository.findAll();
        
        return todos.stream()
            .filter(c -> {
                LocalDate dataChamado = c.getDataCriacao()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
                
                boolean dentroInicio = dataInicio == null || !dataChamado.isBefore(dataInicio);
                boolean dentroFim = dataFim == null || !dataChamado.isAfter(dataFim);
                
                return dentroInicio && dentroFim;
            })
            .collect(Collectors.toList());
    }
    
    private RelatorioDTO gerarRelatorioPorPeriodo(List<Chamado> chamados, LocalDate dataInicio, LocalDate dataFim) {
        Map<LocalDate, List<Chamado>> porData = chamados.stream()
            .collect(Collectors.groupingBy(c -> 
                c.getDataCriacao().atZone(ZoneId.systemDefault()).toLocalDate()
            ));
        
        List<RelatorioDetalhe> detalhes = new ArrayList<>();
        BigDecimal receitaTotal = BigDecimal.ZERO;
        int totalChamados = 0;
        int totalFinalizados = 0;
        
        for (Map.Entry<LocalDate, List<Chamado>> entry : porData.entrySet()) {
            LocalDate data = entry.getKey();
            List<Chamado> chamadosDoDia = entry.getValue();
            
            int chamadosCount = chamadosDoDia.size();
            int finalizadosCount = (int) chamadosDoDia.stream()
                .filter(c -> c.getStatus() == StatusConserto.FINALIZADA)
                .count();
            
            BigDecimal receitaDia = chamadosDoDia.stream()
                .filter(c -> c.getStatus() == StatusConserto.FINALIZADA)
                .filter(c -> c.getOrcamento() != null)
                .map(c -> c.getOrcamento().getValor())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            double taxaConversao = chamadosCount > 0 ? 
                (double) finalizadosCount / chamadosCount : 0.0;
            
            detalhes.add(new RelatorioDetalhe(
                data.toString(),
                chamadosCount,
                finalizadosCount,
                receitaDia,
                taxaConversao,
                null
            ));
            
            totalChamados += chamadosCount;
            totalFinalizados += finalizadosCount;
            receitaTotal = receitaTotal.add(receitaDia);
        }
        
        detalhes.sort(Comparator.comparing(RelatorioDetalhe::chave));
        
        BigDecimal ticketMedio = totalFinalizados > 0 ?
            receitaTotal.divide(BigDecimal.valueOf(totalFinalizados), 2, RoundingMode.HALF_UP) :
            BigDecimal.ZERO;
        
        return new RelatorioDTO(
            "PERIODO",
            totalChamados,
            totalFinalizados,
            receitaTotal,
            ticketMedio,
            detalhes
        );
    }
    
    private RelatorioDTO gerarRelatorioPorCategoria(List<Chamado> chamados) {
        Map<CategoriaEquipamento, List<Chamado>> porCategoria = chamados.stream()
            .collect(Collectors.groupingBy(Chamado::getCategoriaEquipamento));
        
        List<RelatorioDetalhe> detalhes = new ArrayList<>();
        BigDecimal receitaTotal = BigDecimal.ZERO;
        int totalChamados = 0;
        int totalFinalizados = 0;
        
        for (Map.Entry<CategoriaEquipamento, List<Chamado>> entry : porCategoria.entrySet()) {
            CategoriaEquipamento categoria = entry.getKey();
            List<Chamado> chamadosCategoria = entry.getValue();
            
            int chamadosCount = chamadosCategoria.size();
            int finalizadosCount = (int) chamadosCategoria.stream()
                .filter(c -> c.getStatus() == StatusConserto.FINALIZADA)
                .count();
            
            BigDecimal receitaCategoria = chamadosCategoria.stream()
                .filter(c -> c.getStatus() == StatusConserto.FINALIZADA)
                .filter(c -> c.getOrcamento() != null)
                .map(c -> c.getOrcamento().getValor())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            double taxaConversao = chamadosCount > 0 ? 
                (double) finalizadosCount / chamadosCount : 0.0;
            
            BigDecimal ticketMedioCategoria = finalizadosCount > 0 ?
                receitaCategoria.divide(BigDecimal.valueOf(finalizadosCount), 2, RoundingMode.HALF_UP) :
                BigDecimal.ZERO;
            
            detalhes.add(new RelatorioDetalhe(
                categoria.getName(),
                chamadosCount,
                finalizadosCount,
                receitaCategoria,
                taxaConversao,
                ticketMedioCategoria
            ));

            totalChamados += chamadosCount;
            totalFinalizados += finalizadosCount;
            receitaTotal = receitaTotal.add(receitaCategoria);
        }
        
        detalhes.sort((a, b) -> b.receita().compareTo(a.receita()));
        
        BigDecimal ticketMedio = totalFinalizados > 0 ?
            receitaTotal.divide(BigDecimal.valueOf(totalFinalizados), 2, RoundingMode.HALF_UP) :
            BigDecimal.ZERO;
        
        return new RelatorioDTO(
            "CATEGORIA",
            totalChamados,
            totalFinalizados,
            receitaTotal,
            ticketMedio,
            detalhes
        );
    }
}