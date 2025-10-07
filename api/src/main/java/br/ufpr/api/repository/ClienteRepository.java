package br.ufpr.api.repository;

import br.ufpr.api.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Cliente save(Cliente client);
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    Optional<Cliente> findById(Long id);
    Optional<Cliente> findByEmail(String email);
    void deleteById(Long id);
}