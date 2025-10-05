package br.ufpr.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.model.CategoriaEquipamento;
import br.ufpr.api.service.CategoriaEquipamentoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class CategoriaEquipamentoController {
    @Autowired
    private CategoriaEquipamentoService service;

    @PostMapping("/categoria-equipamento")
    public CategoriaEquipamento addNewCategoriaEquipamento(@RequestBody CategoriaEquipamento newCategoriaEquipamento) {
        return service.addNewCategoriaEquipamento(newCategoriaEquipamento);
    }
    
}
