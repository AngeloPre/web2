package br.ufpr.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.ufpr.api.model.entity.CategoriaEquipamento;

public interface CategoriaEquipamentoRepo extends CrudRepository<CategoriaEquipamento, Integer> {
    public CategoriaEquipamento findBySlug(String slug);
    public boolean existsBySlug(String slug);
}
