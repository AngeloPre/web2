package br.ufpr.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import br.ufpr.api.model.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
}
