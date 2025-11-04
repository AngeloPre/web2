package br.ufpr.api.controller;

import java.time.LocalDate;
import java.util.List;

import br.ufpr.api.dto.OrcamentoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.dto.ChamadoCreateUpdateDTO;
import br.ufpr.api.dto.ChamadoDTO;
import br.ufpr.api.model.enums.StatusConserto;
import br.ufpr.api.service.ChamadoService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class ChamadoController {
    @Autowired
    private ChamadoService service;

    @PostMapping("/chamados")
    public ChamadoDTO addNewCategoriaEquipamento(@RequestBody ChamadoCreateUpdateDTO newChamado) {
        return service.addNewChamado(newChamado);

    }

    @GetMapping("/chamados")
    public List<ChamadoDTO> getChamados(
        @RequestParam(required = false) StatusConserto status,
        @RequestParam(required = false, name = "dataInicio")
        @DateTimeFormat(pattern = "dd/MM/yyyy")
        LocalDate dataInicio,
        @RequestParam(required = false, name = "dataFim")
        @DateTimeFormat(pattern = "dd/MM/yyyy")
        LocalDate dataFim) {

        return service.buscarChamados(status, dataInicio, dataFim);
    }

    @GetMapping("/chamados/{id}")
    public ChamadoDTO getChamadoById(@PathVariable Integer id) {
        return service.getChamadoById(id);
    }

    @PutMapping("chamados/{id}")
    public ResponseEntity<ChamadoDTO> updateChamado(
        @PathVariable Integer id,
        @Valid @RequestBody ChamadoCreateUpdateDTO updatedChamado) {
            ChamadoDTO dto = service.updateChamado(id, updatedChamado);
            return ResponseEntity.ok(dto);

    }

    @PostMapping("chamados/{id}/orcamento")
    public ResponseEntity<ChamadoDTO> efetuarOrcamento(
            @PathVariable Integer id,
            @Valid @RequestBody OrcamentoDTO orcamento) {
        ChamadoDTO dto = service.efetuarOrcamento(id, orcamento);
        return ResponseEntity.ok(dto);
    }

}
