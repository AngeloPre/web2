package br.ufpr.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.dto.EquipamentoCreateDTO;
import br.ufpr.api.dto.EquipamentoUpdateDTO;
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
    public CategoriaEquipamento addNewCategoriaEquipamento(@RequestBody @Valid EquipamentoCreateDTO cat) {
        CategoriaEquipamento c = new CategoriaEquipamento();
        c.setName(cat.name());
        c.setBaseValue(cat.baseValue());
        c.setDescription(cat.description());
        c.setStatus(true);
        return service.addNewCategoriaEquipamento(c);
    }

    @GetMapping("/categoria-equipamento")
    public List<CategoriaEquipamento> getAllCategoriasEquipamento() {
        return service.getAllCategoriasEquipamento();
    }
    
    @GetMapping("/categoria-equipamento/slug/{slug}")
    public CategoriaEquipamento getCategoriaEquipamentoBySlug(@PathVariable String slug) {
        return service.getCategoriaEquipamentoBySlug(slug);
    }
    
    @GetMapping("/categoria-equipamento/{id}")
    public CategoriaEquipamento getCategoriaEquipamentoById(@PathVariable Integer id) {
        return service.getCategoriaEquipamentoById(id);
    }

    @PutMapping("categoria-equipamento/{id}")
    public CategoriaEquipamento updateCategoriaEquipamento(@PathVariable Integer id, @RequestBody @Valid EquipamentoUpdateDTO cat) {
        CategoriaEquipamento existingCategoriaEquipamento = service.getCategoriaEquipamentoById(id);
        if (existingCategoriaEquipamento != null) {
            existingCategoriaEquipamento.setName(cat.name());
            existingCategoriaEquipamento.setBaseValue(cat.baseValue());
            if (cat.status() != null) existingCategoriaEquipamento.setStatus(cat.status().booleanValue());
            existingCategoriaEquipamento.setDescription(cat.description());
            return service.addNewCategoriaEquipamento(existingCategoriaEquipamento);
        } else {
            return null;
        }
    }
    
}
