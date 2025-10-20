package br.ufpr.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.service.SeedService;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("defaults")
public class DefaultsController {

    @Autowired
    SeedService seedService;

    @PostMapping("/admin")
    public ResponseEntity<String> createDefaultAdmin() {
        Funcionario f = seedService.createAdminUser();
        if (f != null)  return ResponseEntity.ok("Funcionario padrão criado!");
        return ResponseEntity.badRequest().body("Funcionario padrão já existe!");
    }

    @PostMapping("/equipamento")
    public ResponseEntity<String> createDefaultEquipments() {
        seedService.createDefaultEquipments();
        return ResponseEntity.ok("Equipamentos Criados!");
    }
    
    
    
}
