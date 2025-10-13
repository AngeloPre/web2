package br.ufpr.api.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.ufpr.api.model.entity.Chamado;

public interface ChamadoRepository extends CrudRepository<Chamado, Long> {
    public Chamado findBySlug(String slug);
    List<Chamado> findAllByOrderByDataCriacaoAsc();

}
