package br.ufpr.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.repository.ChamadoRepository;

@Service
public class ChamadoService {
    @Autowired
    private ChamadoRepository chamadoRepository;

    public Chamado addNewChamado(Chamado chamado) {
        chamado.setSlug(chamado.getDescricaoFalha().toLowerCase().replace(" ", "-"));
        return chamadoRepository.save(chamado);
    }

    public List<Chamado> getAllChamados() {
        return chamadoRepository.findAllByOrderByDataCriacaoAsc();
    }

    public Chamado getChamadoBySlug(String slug) {
        return chamadoRepository.findBySlug(slug);
    }

    public Chamado getChamadoById(Long id) {
        return chamadoRepository.findById(id).orElse(null);
    }


}
