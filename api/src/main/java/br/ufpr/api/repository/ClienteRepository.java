package br.ufpr.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.api.model.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer>{
    boolean existsByCpf(String cpf);
    Optional<Cliente> findByCpf(String cpf);
}
