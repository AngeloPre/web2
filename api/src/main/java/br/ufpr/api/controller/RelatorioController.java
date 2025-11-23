package br.ufpr.api.controller;

import br.ufpr.api.dto.RelatorioDTO;
import br.ufpr.api.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin
@RestController
@RequestMapping("/relatorios")
public class RelatorioController {
    
    @Autowired
    private RelatorioService relatorioService;
    
    @GetMapping
    public RelatorioDTO gerarRelatorio(
            @RequestParam(required = true) String tipo,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataInicio,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataFim) {
        
        return relatorioService.gerarRelatorio(tipo, dataInicio, dataFim);
    }
}