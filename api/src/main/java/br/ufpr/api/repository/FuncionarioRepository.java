package br.ufpr.api.repository;

import br.ufpr.api.model.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

//import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
}