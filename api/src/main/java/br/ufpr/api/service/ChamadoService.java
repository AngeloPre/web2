package br.ufpr.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufpr.api.dto.ChamadoCreateUpdateDTO;
import br.ufpr.api.dto.ChamadoDTO;
import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.model.enums.StatusConserto;
import br.ufpr.api.repository.CategoriaEquipamentoRepo;
import br.ufpr.api.repository.ChamadoRepository;
import br.ufpr.api.repository.ClienteRepository;
import br.ufpr.api.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;

@Service
public class ChamadoService {
    @Autowired
    private ChamadoRepository chamadoRepository;
    @Autowired
    private CategoriaEquipamentoRepo categoriaRepo;
    @Autowired
    private  FuncionarioRepository funcionarioRepository;
    @Autowired
    private  ClienteRepository clienteRepository;

    public ChamadoDTO addNewChamado(ChamadoCreateUpdateDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.clienteId())
        .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        CategoriaEquipamento categoria = categoriaRepo.findById(dto.categoriaId())
        .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        Funcionario funcionario = null;
        if (dto.funcionarioId() != null) {
            funcionario = funcionarioRepository.findById(dto.funcionarioId())
            .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado"));
        }

        var ch = new Chamado();
        ch.setCliente(cliente);
        ch.setFuncionario(funcionario);
        ch.setCategoriaEquipamento(categoria);
        ch.setDescricaoEquipamento(dto.descricaoEquipamento());
        ch.setDescricaoFalha(dto.descricaoFalha());
        ch.setPrecoBase(dto.precoBase());
        ch.setComentario(dto.comentario());

        // status inicial normalmente é ABERTA (RF004) — defina onde faz sentido (controller/service)
        ch.setStatus(StatusConserto.ABERTA);

        ch.setSlug(slugify(dto.descricaoFalha()));

        var saved = chamadoRepository.save(ch);
        return toDTO(saved);
    }

    public List<Chamado> getAllChamados() {
        return chamadoRepository.findAllByOrderByDataCriacaoAsc();
    }

    public Chamado getChamadoBySlug(String slug) {
        return chamadoRepository.findBySlug(slug);
    }

    public Chamado getChamadoById(Integer id) {
        return chamadoRepository.findById(id).orElse(null);
    }

    @Transactional
    public ChamadoDTO updateChamado(Integer id, ChamadoCreateUpdateDTO dto) {
        Chamado ch = chamadoRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Chamado não encontrado"));

        Cliente cliente = clienteRepository.findById(dto.clienteId())
        .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        CategoriaEquipamento categoria = categoriaRepo.findById(dto.categoriaId())
        .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        Funcionario funcionario = null;
        if (dto.funcionarioId() != null) {
            funcionario = funcionarioRepository.findById(dto.funcionarioId())
            .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado"));
        }

        ch.setCliente(cliente);                    // sempre tem cliente
        ch.setFuncionario(funcionario);            // pode ser null
        ch.setCategoriaEquipamento(categoria);
        ch.setDescricaoEquipamento(dto.descricaoEquipamento());
        ch.setDescricaoFalha(dto.descricaoFalha());
        ch.setPrecoBase(dto.precoBase());
        ch.setComentario(dto.comentario());

        //PUT não mexe em status/dataCriacao/dataResposta/etapas.
        ch.setSlug(slugify(dto.descricaoFalha()));

        var saved = chamadoRepository.save(ch);
        return toDTO(saved);
    }

    private static ChamadoDTO toDTO(Chamado c) {
        return new ChamadoDTO(
        c.getId(),
        c.getSlug(),
        c.getCliente() != null ? c.getCliente().getNome() : null,
        c.getFuncionario() != null ? c.getFuncionario().getNome() : null,
        c.getCategoriaEquipamento() != null ? c.getCategoriaEquipamento().getName() : null,
        c.getDescricaoEquipamento(),
        c.getDescricaoFalha(),
        c.getPrecoBase(),
        c.getComentario(),
        c.getStatus() != null ? c.getStatus().name() : null,
        c.getDataCriacao(),
        c.getDataResposta()
        );
    }

    private static String slugify(String s) {
        return s == null ? null : s.trim().toLowerCase().replaceAll("\\s+", "-");
    }

}
