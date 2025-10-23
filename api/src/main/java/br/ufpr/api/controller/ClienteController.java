package br.ufpr.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.service.ClienteService;

@RestController
public class ClienteController {
    @Autowired
    private ClienteService service;

    @GetMapping("/cliente")
    public ResponseEntity<List<Cliente>> listarTodosClientes(){
        List<Cliente> clientes = service.getAllClientes();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity<Cliente> buscarClientePorId(@PathVariable Integer id) {
        Cliente cliente = service.buscarPorId(id);
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/cliente/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Integer id, @RequestBody Cliente clienteAtualizado){
        Cliente updatedCliente = service.updateCliente(id, clienteAtualizado);
        return ResponseEntity.ok(updatedCliente);
    }

    @DeleteMapping("/cliente/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Integer id) {
        service.deleteCliente(id); //desativa o cliente
        return ResponseEntity.noContent().build();
    }
    
}
