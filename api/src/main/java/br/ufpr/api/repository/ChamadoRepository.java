package br.ufpr.api.repository;

import java.time.Instant;
import java.util.List;


import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.model.enums.StatusConserto;


public interface ChamadoRepository extends CrudRepository<Chamado, Integer> {
    List<Chamado> findAllByOrderByDataCriacaoAsc();

    @EntityGraph(attributePaths = {"cliente","funcionario","categoriaEquipamento"})
    List<Chamado> findByStatus(StatusConserto status);
    List<Chamado> findByStatusAndDataCriacaoBetweenOrderByDataCriacaoAsc(StatusConserto status, Instant inicio, Instant fim);
    List<Chamado> findByClienteAndDataCriacaoBetweenOrderByDataCriacaoAsc(Cliente cliente, Instant inicio, Instant fim);
    List<Chamado> findByDataCriacaoBetweenOrderByDataCriacaoAsc(Instant inicio, Instant fim);
    List<Chamado> findByDataCriacaoGreaterThanEqualOrderByDataCriacaoAsc(Instant inicio);
    List<Chamado> findByDataCriacaoLessThanEqualOrderByDataCriacaoAsc(Instant fim);

    @Query("""
        SELECT c FROM Chamado c
        WHERE
            (c.funcionario = :funcionario AND c.dataCriacao BETWEEN :inicio AND :fim)
            OR
            (c.status = :status AND c.dataCriacao BETWEEN :inicio AND :fim)
        ORDER BY c.dataCriacao ASC
    """)
    List<Chamado> filtrarChamados(
        @Param("funcionario") Funcionario funcionario,
        @Param("inicio") Instant inicio,
        @Param("fim") Instant fim,
        @Param("status") StatusConserto status);
        }
