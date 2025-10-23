package br.ufpr.api.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.repository.ClienteRepository;
import br.ufpr.api.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Transactional
    public Cliente autocadastroCliente(Cliente cliente){
        if(clienteRepository.existsByCpf(cliente.getCpf())){
            throw new IllegalArgumentException("ERRO: CPF já cadastrado");
        }
        if(usuarioRepository.existsByEmail(cliente.getEmail())){
            throw new IllegalArgumentException("ERRO: Email já cadastrado");
        }

        String senha = String.format("%04d", new Random().nextInt(10000));
        cliente.setSenha(passwordEncoder.encode(senha));
        cliente.setStatus(true);

        Cliente newCliente = clienteRepository.save(cliente);

        try{
            emailService.enviarSenhaDeCadastro(newCliente.getEmail(), senha);
        } catch (Exception e){
            throw new IllegalStateException("ERRO: Não foi possível enviar o email de cadastro");
        }

        return newCliente;
    }

    @Transactional(readOnly = true)
    public List<Cliente> getAllClientes(){
        return clienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Cliente buscarPorId(Integer id) {
        return clienteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("ERRO: Cliente não encontrado"));
    }

    @Transactional
    public Cliente updateCliente(Integer id, Cliente clienteAtualizado){
        Cliente clienteExistente = buscarPorId(id);

        if (!clienteExistente.getEmail().equals(clienteAtualizado.getEmail()) &&
            usuarioRepository.existsByEmail(clienteAtualizado.getEmail())) {
            throw new IllegalArgumentException("ERRO: Email já cadastrado");
        }

        if (!clienteExistente.getCpf().equals(clienteAtualizado.getCpf()) &&
            clienteRepository.existsByCpf(clienteAtualizado.getCpf())) {
            throw new IllegalArgumentException("ERRO: CPF já cadastrado");
        }

        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setEmail(clienteAtualizado.getEmail());
        clienteExistente.setCpf(clienteAtualizado.getCpf());
        clienteExistente.setSenha(passwordEncoder.encode(clienteAtualizado.getSenha()));
        clienteExistente.setTelefone(clienteAtualizado.getTelefone());
        clienteExistente.setEndereco(clienteAtualizado.getEndereco());
        clienteExistente.setStatus(clienteAtualizado.isStatus());

        return clienteRepository.save(clienteExistente);
    }

    public void deleteCliente(Integer id){
        Cliente cliente = buscarPorId(id);
        cliente.setStatus(false);
        clienteRepository.save(cliente);
    }

}
