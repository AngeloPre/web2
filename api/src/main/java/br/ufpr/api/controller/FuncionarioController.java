package br.ufpr.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.service.FuncionarioService;
import jakarta.validation.Valid;



@RestController
public class FuncionarioController {
    @Autowired
    private FuncionarioService service;

    @GetMapping("/funcionario")
    public ResponseEntity<List<Funcionario>> listarTodosFuncionarios(){
        List<Funcionario> funcionarios = service.getAllFuncionarios();
        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/funcionario/{id}")
    public ResponseEntity<Funcionario> buscarFuncionarioPorId(@PathVariable Integer id) {
        Funcionario funcionario = service.buscarPorId(id);
        return ResponseEntity.ok(funcionario);
    }

    @PostMapping("/funcionario")
    public ResponseEntity<Funcionario> inserirFuncionario(@Valid @RequestBody Funcionario funcionario){
        Funcionario newFuncionario = service.addNewFuncionario(funcionario);
        return new ResponseEntity<>(newFuncionario, HttpStatus.CREATED);
    }

    @PutMapping("/funcionario/{id}")
    public ResponseEntity<Funcionario> atualizarFuncionario(@PathVariable Integer id, @Valid @RequestBody Funcionario funcionarioAtualizado){
        Funcionario updatedFuncionario = service.updateFuncionario(id, funcionarioAtualizado);
        return ResponseEntity.ok(updatedFuncionario);
    }
    
    @DeleteMapping("/funcionario/{id}")
    public ResponseEntity<Void> deletarFuncionario(@PathVariable Integer id) {
        service.deleteFuncionario(id); //desativa o funcionário
        return ResponseEntity.noContent().build();
    }
    
}
