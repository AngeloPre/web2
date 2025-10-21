package br.ufpr.api.service;

import br.ufpr.api.dto.ClienteRegisterDTO;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.enums.RoleUsuario;
import br.ufpr.api.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    //para inserir novo cliente pelo admin
    @Transactional
    public Cliente criarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    //autocadastro do cliente
    @Transactional
    public Cliente registrarCliente(ClienteRegisterDTO data) {
        if(clienteRepository.existsByCpf(data.cpf())){
            throw new IllegalArgumentException("CPF ja cadastrado");
        }
        if(clienteRepository.existsByEmail(data.email())){
            throw new IllegalArgumentException("Email ja cadastrado");
        }
        
        String senhaRandom = String.valueOf(new Random().nextInt(9000) + 1000);

        Cliente cliente = new Cliente();
        cliente.setNome(data.nome());
        cliente.setCpf(data.cpf());
        cliente.setEmail(data.email());
        cliente.setTelefone(data.telefone());
        cliente.setRole(RoleUsuario.CLIENTE);
        cliente.setSenha(passwordEncoder.encode(senhaRandom));
        cliente.setCep(data.cep());
        cliente.setLogradouro(data.logradouro());
        cliente.setComplemento(data.complemento());
        cliente.setBairro(data.bairro());
        cliente.setCidade(data.cidade());
        cliente.setUf(data.uf());
        cliente.setNumero(data.numero());

        Cliente clienteSaved = clienteRepository.save(cliente);
        emailService.enviarSenhaDeCadastro(clienteSaved.getEmail(), senhaRandom);

        return clienteSaved;
    }

    @Transactional
    public void deleteById(Long id) {
        clienteRepository.deleteById(id);
    }

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Cliente findById(Long id) {
        return clienteRepository.findById(id).orElse(null);
    }

    public UserDetails findByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    public boolean existsById(Long id) {
        return clienteRepository.existsById(id);
    }
}