package br.ufpr.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.model.CategoriaEquipamento;
import br.ufpr.api.service.CategoriaEquipamentoService;
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
    public CategoriaEquipamento addNewCategoriaEquipamento(@RequestBody CategoriaEquipamento newCategoriaEquipamento) {
        return service.addNewCategoriaEquipamento(newCategoriaEquipamento);
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
    public CategoriaEquipamento updateCategoriaEquipamento(@PathVariable Integer id, @RequestBody CategoriaEquipamento updatedCategoriaEquipamento) {
        CategoriaEquipamento existingCategoriaEquipamento = service.getCategoriaEquipamentoById(id);
        if (existingCategoriaEquipamento != null) {
            existingCategoriaEquipamento.setNome(updatedCategoriaEquipamento.getNome());
            existingCategoriaEquipamento.setPrecoBase(updatedCategoriaEquipamento.getPrecoBase());
            existingCategoriaEquipamento.setStatus(updatedCategoriaEquipamento.isStatus());
            existingCategoriaEquipamento.setDescricao(updatedCategoriaEquipamento.getDescricao());
            return service.addNewCategoriaEquipamento(existingCategoriaEquipamento);
        } else {
            return null;
        }
    }
    
}
