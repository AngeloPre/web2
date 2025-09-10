package br.ufpr.api.repository;

import br.ufpr.api.model.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    Client save(Client client);
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    Optional<Client> findById(UUID id);
    Optional<Client> findByEmail(String email);
    void deleteById(UUID id);
}
