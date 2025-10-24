package br.ufpr.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.dto.EquipamentoCreateUpdateDTO;
import br.ufpr.api.dto.EquipamentoDTO;
import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.service.CategoriaEquipamentoService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class CategoriaEquipamentoController {

    @Autowired
    private CategoriaEquipamentoService service;

    @PostMapping("/categoria-equipamento")
    @PreAuthorize("hasAuthority('FUNCIONARIO')")
    public ResponseEntity<EquipamentoDTO> addNewCategoriaEquipamento(@RequestBody @Valid EquipamentoCreateUpdateDTO newCategoriaEquipamento) {
        CategoriaEquipamento newCat = service.createCategoriaEquipamento(newCategoriaEquipamento);
        return new ResponseEntity<>(service.toDto(newCat) ,HttpStatus.CREATED);
    }

    @GetMapping("/categoria-equipamento")
    public ResponseEntity<List<EquipamentoDTO>> getAllCategoriasEquipamento() {
        List<EquipamentoDTO> categorias = service.getAllCategoriasEquipamento()
            .stream().map(c -> service.toDto(c)).collect(Collectors.toList());
        return new ResponseEntity<>(categorias, HttpStatus.OK);
    }
    
    @GetMapping("/categoria-equipamento/slug/{slug}")
    public ResponseEntity<EquipamentoDTO> getCategoriaEquipamentoBySlug(@PathVariable String slug) {
        CategoriaEquipamento cat = service.getCategoriaEquipamentoBySlug(slug);
        return new ResponseEntity<>(service.toDto(cat), HttpStatus.OK);
    }
    
    @GetMapping("/categoria-equipamento/{id}")
    public ResponseEntity<EquipamentoDTO> getCategoriaEquipamentoById(@PathVariable @Valid Integer id) {
        CategoriaEquipamento cat = service.getCategoriaEquipamentoById(id);
        return new ResponseEntity<>(service.toDto(cat), HttpStatus.OK);
    }

    @PutMapping("categoria-equipamento/{id}")
    @PreAuthorize("hasAuthority('FUNCIONARIO')")
    public ResponseEntity<EquipamentoDTO> updateCategoriaEquipamento(
        @PathVariable Integer id, 
        @RequestBody @Valid EquipamentoCreateUpdateDTO equipamento) 
    {
        CategoriaEquipamento cat =  service.updateCategoriaEquipamento(id, equipamento);
        return new ResponseEntity<>(service.toDto(cat), HttpStatus.OK);
    }
    
}
