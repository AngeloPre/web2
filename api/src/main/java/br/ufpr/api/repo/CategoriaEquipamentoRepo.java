package br.ufpr.api.repo;

import org.springframework.data.repository.CrudRepository;

import br.ufpr.api.model.CategoriaEquipamento;

public interface CategoriaEquipamentoRepo extends CrudRepository<CategoriaEquipamento, Integer> {
    public CategoriaEquipamento findBySlug(String slug);
}
