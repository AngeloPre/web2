package br.ufpr.api.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.enums.StatusConserto;


public interface ChamadoRepository extends CrudRepository<Chamado, Integer> {
    List<Chamado> findAllByOrderByDataCriacaoAsc();

    @EntityGraph(attributePaths = {"cliente","funcionario","categoriaEquipamento"})
    List<Chamado> findByStatus(StatusConserto status);
    List<Chamado> findByStatusAndDataCriacaoBetweenOrderByDataCriacaoAsc(StatusConserto status, Instant inicio, Instant fim);
    List<Chamado> findByClienteAndDataCriacaoBetweenOrderByDataCriacaoAsc(Cliente cliente, Instant inicio, Instant fim);
    List<Chamado> findByDataCriacaoBetweenOrderByDataCriacaoAsc(Instant inicio, Instant fim);

}
