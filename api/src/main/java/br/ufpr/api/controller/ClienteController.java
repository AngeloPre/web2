package br.ufpr.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.service.ClienteService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
public class ClienteController {
    @Autowired
    private ClienteService service;

    @PostMapping("/cliente")
    public Cliente addNewCliente(@RequestBody Cliente newCliente) {
        return service.criarCliente(newCliente);
    }
    
    @GetMapping("/cliente")
    public List<Cliente> getAllClientes() {
        return service.findAll();
    }

    @GetMapping("/cliente/{id}")
    public Cliente getClienteById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PutMapping("cliente/{id}")
    public Cliente updateCliente(@PathVariable Long id, @RequestBody Cliente updatedCliente) {
        Cliente existingCliente = service.findById(id);
        if (existingCliente != null) {
            existingCliente.setNome(updatedCliente.getNome());
            existingCliente.setEmail(updatedCliente.getEmail());
            //existingCliente.setCpf(updatedCliente.getCpf()); rever essa regra de poder att cpf do cliente           
            existingCliente.setTelefone(updatedCliente.getTelefone());
            existingCliente.setCep(updatedCliente.getCep());
            existingCliente.setLogradouro(updatedCliente.getLogradouro());
            existingCliente.setComplemento(updatedCliente.getComplemento());
            existingCliente.setBairro(updatedCliente.getBairro());
            existingCliente.setCidade(updatedCliente.getCidade());
            existingCliente.setUf(updatedCliente.getUf());
            existingCliente.setNumero(updatedCliente.getNumero());

            return service.criarCliente(existingCliente);
        } else {
            return null;
        }
    }
    


    
}
