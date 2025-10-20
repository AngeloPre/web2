package br.ufpr.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.service.SeedService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("defaults")
public class DefaultsController {

    @Autowired
    SeedService seedService;

    @PostMapping("/admin")
    public ResponseEntity<String> createDefaultAdmin() {
        seedService.createAdminUser();
        return ResponseEntity.ok("Funcionario padrão criado!");
    }

    @PostMapping("/equipamento")
    public ResponseEntity<String> createDefaultEquipments() {
        seedService.createDefaultEquipments();
        return ResponseEntity.ok("Equipamentos Criados!");
    }
    
    
    
}
