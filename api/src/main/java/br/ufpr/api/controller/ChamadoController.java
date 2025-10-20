package br.ufpr.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.dto.ChamadoCreateUpdateDTO;
import br.ufpr.api.dto.ChamadoDTO;
import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.service.ChamadoService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public List<Chamado> getAllChamados() {
        return service.getAllChamados();
    }

    @GetMapping("/chamados/slug/{slug}")
    public Chamado getChamadoBySlug(@PathVariable String slug) {
        return service.getChamadoBySlug(slug);
    }

    @GetMapping("/chamados/{id}")
    public Chamado getChamadoById(@PathVariable Integer id) {
        return service.getChamadoById(id);
    }

    @PutMapping("chamados/{id}")
    public ResponseEntity<ChamadoDTO> updateChamado(
        @PathVariable Integer id,
        @Valid @RequestBody ChamadoCreateUpdateDTO updatedChamado) {
            ChamadoDTO dto = service.updateChamado(id, updatedChamado);
            return ResponseEntity.ok(dto);

    }

}
