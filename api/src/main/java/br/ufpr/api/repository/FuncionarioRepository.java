package br.ufpr.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.api.model.entity.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer>{
    
}
