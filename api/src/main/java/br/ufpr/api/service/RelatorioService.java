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
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.Instant;
import java.util.*;

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
        Instant inicio = dataInicio != null ? 
            dataInicio.atStartOfDay(ZoneId.systemDefault()).toInstant() : null;
        Instant fim = dataFim != null ? 
            dataFim.atTime(LocalTime.MAX).atZone(ZoneId.systemDefault()).toInstant() : null;
        
        if (inicio != null && fim != null) {
            return chamadoRepository.findByDataCriacaoBetweenOrderByDataCriacaoAsc(inicio, fim);
        } else if (inicio != null) {
            return chamadoRepository.findByDataCriacaoGreaterThanEqualOrderByDataCriacaoAsc(inicio);
        } else if (fim != null) {
            return chamadoRepository.findByDataCriacaoLessThanEqualOrderByDataCriacaoAsc(fim);
        } else {
            return (List<Chamado>) chamadoRepository.findAll();
        }
    }
    
    private RelatorioDTO gerarRelatorioPorPeriodo(List<Chamado> chamados, LocalDate dataInicio, LocalDate dataFim) {
        List<RelatorioDetalhe> detalhes = new ArrayList<>();
        BigDecimal receitaTotal = BigDecimal.ZERO;
        int totalChamados = 0;
        int totalFinalizados = 0;
        List<LocalDate> datasProcessadas = new ArrayList<>();
        
        for (Chamado chamado : chamados) {
            LocalDate data = chamado.getDataCriacao()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
            
            boolean jaProcessada = false;
            for (LocalDate dataProcessada : datasProcessadas) {
                if (dataProcessada.equals(data)) {
                    jaProcessada = true;
                    break;
                }
            }
            
            // Se não foi processada ainda
            if (!jaProcessada) {
                datasProcessadas.add(data);
            }
        }
        
        Collections.sort(datasProcessadas);
        
        for (LocalDate data : datasProcessadas) {
            int qtdChamados = 0;
            int qtdFinalizados = 0;
            BigDecimal receitaDia = BigDecimal.ZERO;
            
            for (Chamado chamado : chamados) {
                LocalDate dataChamado = chamado.getDataCriacao()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
                
                if (dataChamado.equals(data)) {
                    qtdChamados++;
                    if (chamado.getStatus() == StatusConserto.FINALIZADA) {
                        qtdFinalizados++;
                        if (chamado.getOrcamento() != null) {
                            receitaDia = receitaDia.add(chamado.getOrcamento().getValor());
                        }
                    }
                }
            }
            
            double taxaConversao = qtdChamados > 0 ? 
                (double) qtdFinalizados / qtdChamados : 0.0;
            
            detalhes.add(new RelatorioDetalhe(
                data.toString(),
                qtdChamados,
                qtdFinalizados,
                receitaDia,
                taxaConversao,
                null
            ));
            
            totalChamados += qtdChamados;
            totalFinalizados += qtdFinalizados;
            receitaTotal = receitaTotal.add(receitaDia);
        }
                
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
        List<RelatorioDetalhe> detalhes = new ArrayList<>();
        BigDecimal receitaTotal = BigDecimal.ZERO;
        int totalChamados = 0;
        int totalFinalizados = 0;
        List<CategoriaEquipamento> categoriasProcessadas = new ArrayList<>();
         
        for (Chamado chamado : chamados) {
            CategoriaEquipamento categoria = chamado.getCategoriaEquipamento();
            if (categoria == null) {
                continue;
            }
            boolean jaProcessada = false;
            for (CategoriaEquipamento catProcessada : categoriasProcessadas) {
                if (catProcessada.getCategoryId().equals(categoria.getCategoryId())) {
                    jaProcessada = true;
                    break;
                }
            }
            if (!jaProcessada) {
                categoriasProcessadas.add(categoria);
            }
        }
        
        for (CategoriaEquipamento categoria : categoriasProcessadas) {
            int qtdChamados = 0;
            int qtdFinalizados = 0;
            BigDecimal receitaCategoria = BigDecimal.ZERO;
            
            for (Chamado chamado : chamados) {
                if (chamado.getCategoriaEquipamento() != null && 
                    chamado.getCategoriaEquipamento().getCategoryId().equals(categoria.getCategoryId())) {
                    
                    qtdChamados++;
                    if (chamado.getStatus() == StatusConserto.FINALIZADA) {
                        qtdFinalizados++;
                        if (chamado.getOrcamento() != null) {
                            receitaCategoria = receitaCategoria.add(chamado.getOrcamento().getValor());
                        }
                    }
                }
            }
            
            double taxaConversao = qtdChamados > 0 ? 
                (double) qtdFinalizados / qtdChamados : 0.0;
            
            BigDecimal ticketMedioCategoria = qtdFinalizados > 0 ?
                receitaCategoria.divide(BigDecimal.valueOf(qtdFinalizados), 2, RoundingMode.HALF_UP) :
                BigDecimal.ZERO;
            
            detalhes.add(new RelatorioDetalhe(
                categoria.getName(),
                qtdChamados,
                qtdFinalizados,
                receitaCategoria,
                taxaConversao,
                ticketMedioCategoria
            ));

            totalChamados += qtdChamados;
            totalFinalizados += qtdFinalizados;
            receitaTotal = receitaTotal.add(receitaCategoria);
        }
        
        Collections.sort(detalhes, new Comparator<RelatorioDetalhe>() {
            @Override
            public int compare(RelatorioDetalhe a, RelatorioDetalhe b) {
                return b.receita().compareTo(a.receita());
            }
        });
        
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