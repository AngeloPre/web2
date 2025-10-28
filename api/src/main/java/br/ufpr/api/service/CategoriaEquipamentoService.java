package br.ufpr.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufpr.api.dto.EquipamentoCreateUpdateDTO;
import br.ufpr.api.dto.EquipamentoDTO;
import br.ufpr.api.exception.ResourceConflictException;
import br.ufpr.api.exception.ResourceNotFoundException;
import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.repository.CategoriaEquipamentoRepo;

@Service
public class CategoriaEquipamentoService {
    @Autowired
    private CategoriaEquipamentoRepo categoriaEquipamentoRepo;

    public CategoriaEquipamento updateCategoriaEquipamento(Integer id, EquipamentoCreateUpdateDTO equipamentoDTO) {
       CategoriaEquipamento cat = categoriaEquipamentoRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Equipamento não encontrado"));
        String slug = equipamentoDTO.name().toLowerCase().replace(" ", "-");
        if (categoriaEquipamentoRepo.existsBySlug(slug)) throw new ResourceConflictException("Equipamento já existe");
        cat.setName(equipamentoDTO.name());
        cat.setBaseValue(equipamentoDTO.baseValue());
        cat.setSlug(slug);
        if (equipamentoDTO.status() != null) cat.setStatus(equipamentoDTO.status());
        return categoriaEquipamentoRepo.save(cat);
    }

    public CategoriaEquipamento createCategoriaEquipamento(EquipamentoCreateUpdateDTO equipamento) {
        CategoriaEquipamento cat = fromDto(equipamento);
        if (categoriaEquipamentoRepo.existsBySlug(cat.getSlug())) {
            throw new ResourceConflictException("Equipamento já está cadastrado");
        }
        cat.setStatus(true);
        return categoriaEquipamentoRepo.save(cat);
    }

    public List<CategoriaEquipamento> getAllCategoriasEquipamento() {
        return (List<CategoriaEquipamento>) categoriaEquipamentoRepo.findAll();
    }

    public CategoriaEquipamento getCategoriaEquipamentoBySlug(String slug) {
        return categoriaEquipamentoRepo.findBySlug(slug)
            .orElseThrow(() -> new ResourceNotFoundException("Equipamento não encontrado"));
    }

    public CategoriaEquipamento getCategoriaEquipamentoById(Integer id) {
        return categoriaEquipamentoRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Equipamento não encontrado"));
    }

    public EquipamentoDTO toDto(CategoriaEquipamento cat) {
        return new EquipamentoDTO(
            cat.getCategoryId(), 
            cat.getName(), 
            cat.getSlug(), 
            cat.getBaseValue(), 
            cat.isStatus(), 
            cat.getCreatedAt());
    }
    
    public CategoriaEquipamento fromDto(EquipamentoCreateUpdateDTO equipamento) {
        CategoriaEquipamento cat = new CategoriaEquipamento();
        cat.setBaseValue(equipamento.baseValue());
        cat.setName(equipamento.name());
        cat.setSlug(equipamento.name().toLowerCase().replace(" ", "-"));
        return cat;
    }
}
