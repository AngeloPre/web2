package br.ufpr.api.service;

import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteService {
    @Autowired
    ClienteRepository clientRepository;

    @Transactional
    public Cliente save(Cliente client) {
        return clientRepository.save(client);
    }
    @Transactional
    public void deleteById(Long id) {
        clientRepository.deleteById(id);
    }
    public List<Cliente> findAll() {
        return clientRepository.findAll();
    }
    public Optional<Cliente> findById(Long id) {
        return clientRepository.findById(id);
    }
    public Optional<Cliente> findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public boolean existsById(Long id) {
        return clientRepository.existsById(id);
    }
    public boolean existsByCpf(String cpf) {
        return clientRepository.existsByCpf(cpf);
    }
    public boolean existsByEmail(String email) {
        return clientRepository.existsByEmail(email);
    }
}