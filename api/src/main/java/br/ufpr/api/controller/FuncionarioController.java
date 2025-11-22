package br.ufpr.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.dto.FuncionarioCreateUpdateDTO;
import br.ufpr.api.dto.FuncionarioDTO;
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.service.FuncionarioService;
import jakarta.validation.Valid;



@RestController
public class FuncionarioController {
    @Autowired
    private FuncionarioService service;

    @GetMapping("/funcionario")
    //@PreAuthorize("hasAuthority('FUNCIONARIO')")
    public ResponseEntity<List<FuncionarioDTO>> listarTodosFuncionarios(){
        List<FuncionarioDTO> funcionarios = service.getAllFuncionariosAtivos()
            .stream().map(f -> service.toDTO(f)).collect(Collectors.toList());
        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/funcionario/{id}")
    //@PreAuthorize("hasAuthority('FUNCIONARIO')")
    public ResponseEntity<FuncionarioDTO> buscarFuncionarioPorId(@PathVariable Integer id) {
        Funcionario funcionario = service.buscarPorId(id);
        return ResponseEntity.ok(service.toDTO(funcionario));
    }

    @PostMapping("/funcionario")
    //@PreAuthorize("hasAuthority('FUNCIONARIO')")
    public ResponseEntity<FuncionarioDTO> inserirFuncionario(@Valid @RequestBody FuncionarioCreateUpdateDTO funcionario){
        Funcionario newFuncionario = service.addNewFuncionario(funcionario);
        return new ResponseEntity<>(service.toDTO(newFuncionario), HttpStatus.CREATED);
    }

    @PutMapping("/funcionario/{id}")
    //@PreAuthorize("hasAuthority('FUNCIONARIO')")
    public ResponseEntity<FuncionarioDTO> atualizarFuncionario(@PathVariable Integer id, 
        @Valid @RequestBody FuncionarioCreateUpdateDTO funcionarioAtualizado)
    {
        Funcionario updatedFuncionario = service.updateFuncionario(id, funcionarioAtualizado);
        return ResponseEntity.ok(service.toDTO(updatedFuncionario));
    }
    
    @DeleteMapping("/funcionario/{id}")
    //@PreAuthorize("hasAuthority('FUNCIONARIO')")
    public ResponseEntity<Void> deletarFuncionario(@PathVariable Integer id, @AuthenticationPrincipal UserDetails activeUser){
        service.deleteFuncionario(id, activeUser); //desativa o funcionário
        return ResponseEntity.noContent().build();
    }
    
}
