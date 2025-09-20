package br.ufpr.api.service;

import br.ufpr.api.model.entity.Client;
import br.ufpr.api.repository.ClientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class ClientService {
    @Autowired
    ClientRepository clientRepository;

    @Transactional
    public Client save(Client client) {
        return clientRepository.save(client);
    }
    @Transactional
    public void deleteById(UUID id) {
        clientRepository.deleteById(id);
    }
    public List<Client> findAll() {
        return clientRepository.findAll();
    }
    public Optional<Client> findById(UUID id) {
        return clientRepository.findById(id);
    }
    public Optional<Client> findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public boolean existsById(UUID id) {
        return clientRepository.existsById(id);
    }
    public boolean existsByCpf(String cpf) {
        return clientRepository.existsByCpf(cpf);
    }
    public boolean existsByEmail(String email) {
        return clientRepository.existsByEmail(email);
    }




}
