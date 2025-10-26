package br.ufpr.api.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufpr.api.dto.ChamadoCreateUpdateDTO;
import br.ufpr.api.dto.ChamadoDTO;
import br.ufpr.api.dto.ClienteDTO;
import br.ufpr.api.dto.EnderecoDTO;
import br.ufpr.api.dto.FuncionarioDTO;
import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.entity.Endereco;
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

        // status inicial é ABERTA (RF004)
        ch.setStatus(StatusConserto.ABERTA);

        ch.setSlug(slugify(dto.descricaoFalha()));

        var saved = chamadoRepository.save(ch);
        return toDTO(saved);
    }

    public List<ChamadoDTO> buscarChamados(StatusConserto status,
    LocalDate dataInicio,
    LocalDate dataFim) {
        ZoneId zone = ZoneId.of("America/Sao_Paulo");

        var inicio = (dataInicio != null)
        ? dataInicio.atStartOfDay(zone).toInstant()
        : Instant.EPOCH;

        var fim = (dataFim != null)
        ? dataFim.plusDays(1).atStartOfDay(zone).minusNanos(1).toInstant()
        : Instant.now();

        if (status != null) {
            return toDTO(chamadoRepository
            .findByStatusAndDataCriacaoBetweenOrderByDataCriacaoAsc(status, inicio, fim));
        }
        return toDTO(chamadoRepository
        .findByDataCriacaoBetweenOrderByDataCriacaoAsc(inicio, fim));
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
        ch.setFuncionario(funcionario);            // pode nao ter um (quando criada)
        ch.setCategoriaEquipamento(categoria);
        ch.setDescricaoEquipamento(dto.descricaoEquipamento());
        ch.setDescricaoFalha(dto.descricaoFalha());
        ch.setPrecoBase(dto.precoBase());
        ch.setComentario(dto.comentario());

        ch.setSlug(slugify(dto.descricaoFalha()));

        var saved = chamadoRepository.save(ch);
        return toDTO(saved);
    }

    private static ChamadoDTO toDTO(Chamado c) {
        return new ChamadoDTO(
        c.getId(),
        c.getSlug(),
        toClienteDTO(c.getCliente()),
        toFuncionarioDTO(c.getFuncionario()),
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

    private static ClienteDTO toClienteDTO(Cliente c) {
        if (c == null) return null;
        return new ClienteDTO(
        c.getIdUsuario(),
        c.getNome(),
        c.getEmail(),
        c.getTelefone(),
        c.getCpf(),
        toEnderecoDTO(c.getEndereco())
        );
    }

    private static FuncionarioDTO toFuncionarioDTO(Funcionario f) {
        if (f == null) return null;
        return new FuncionarioDTO(
        f.getIdUsuario(),
        f.getNome(),
        f.getEmail(),
        f.getDataNascimento()
        );
    }

    private static EnderecoDTO toEnderecoDTO(Endereco e) {
        if (e == null) return null;
        return new EnderecoDTO(
        e.getCep(), e.getLogradouro(), e.getNumero(),
        e.getBairro(), e.getCidade(), e.getUf()
        );
    }

    private static List<ChamadoDTO> toDTO(List<Chamado> listaChamados) {
        List<ChamadoDTO> lista = new ArrayList<>();
        for (Chamado chamado : listaChamados) {
            lista.add(toDTO(chamado));
        }
        return lista;
    }

    private static String slugify(String s) {
        return s == null ? null : s.trim().toLowerCase().replaceAll("\\s+", "-");
    }

}
