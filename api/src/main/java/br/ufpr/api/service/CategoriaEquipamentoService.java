package br.ufpr.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufpr.api.model.CategoriaEquipamento;
import br.ufpr.api.repo.CategoriaEquipamentoRepo;

@Service
public class CategoriaEquipamentoService {
    @Autowired
    private CategoriaEquipamentoRepo categoriaEquipamentoRepo;

    public CategoriaEquipamento addNewCategoriaEquipamento(CategoriaEquipamento categoriaEquipamento) {
        categoriaEquipamento.setSlug(categoriaEquipamento.getNome().toLowerCase().replace(" ", "-"));
        return categoriaEquipamentoRepo.save(categoriaEquipamento);
    }

    public List<CategoriaEquipamento> getAllCategoriasEquipamento() {
        return (List<CategoriaEquipamento>) categoriaEquipamentoRepo.findAll();
    }

    public CategoriaEquipamento getCategoriaEquipamentoBySlug(String slug) {
        return categoriaEquipamentoRepo.findBySlug(slug);
    }

    public CategoriaEquipamento getCategoriaEquipamentoById(Integer id) {
        return categoriaEquipamentoRepo.findById(id).orElse(null);
    }


}
