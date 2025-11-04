package br.ufpr.api.repository;


import br.ufpr.api.model.entity.Orcamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrcamentoRepository extends JpaRepository<Orcamento, Integer>{
}
