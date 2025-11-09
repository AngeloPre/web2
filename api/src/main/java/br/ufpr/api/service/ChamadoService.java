package br.ufpr.api.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import br.ufpr.api.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import br.ufpr.api.dto.ChamadoCreateUpdateDTO;
import br.ufpr.api.dto.ChamadoDTO;
import br.ufpr.api.dto.ClienteDTO;
import br.ufpr.api.dto.EnderecoDTO;
import br.ufpr.api.dto.EtapaHistoricoDTO;
import br.ufpr.api.dto.FuncionarioDTO;
import br.ufpr.api.dto.OrcamentoDTO;
import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.entity.Endereco;
import br.ufpr.api.model.entity.EtapaHistorico;
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.model.entity.Orcamento;
import br.ufpr.api.model.enums.StatusConserto;
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
    @Autowired
    private OrcamentoRepository orcamentoRepository;

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

        var saved = chamadoRepository.save(ch);
        return toDTO(saved);
    }

    public List<ChamadoDTO> buscarChamados(StatusConserto status,
    LocalDate dataInicio,
    LocalDate dataFim,
    UserDetails activeUser) {
        ZoneId zone = ZoneId.of("America/Sao_Paulo");
        Cliente c = null;
        if (activeUser instanceof Cliente) {
            c = (Cliente) activeUser;
        }

        var inicio = (dataInicio != null)
        ? dataInicio.atStartOfDay(zone).toInstant()
        : Instant.EPOCH;

        var fim = (dataFim != null)
        ? dataFim.plusDays(1).atStartOfDay(zone).minusNanos(1).toInstant()
        : Instant.now();

        if (c != null) {
            return toDTO(chamadoRepository
                .findByClienteAndDataCriacaoBetweenOrderByDataCriacaoAsc(c, inicio, fim));
        }

        if (status != null) {
            return toDTO(chamadoRepository
            .findByStatusAndDataCriacaoBetweenOrderByDataCriacaoAsc(status, inicio, fim));
        }
        
        return toDTO(chamadoRepository
                .findByDataCriacaoBetweenOrderByDataCriacaoAsc(inicio, fim));
    }

    public ChamadoDTO getChamadoById(Integer id) {
        return toDTO(chamadoRepository.findById(id).orElse(null));
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

        var saved = chamadoRepository.save(ch);
        return toDTO(saved);
    }

    @Transactional
    public ChamadoDTO efetuarOrcamento(Integer id, OrcamentoDTO dto) {
        Chamado ch = chamadoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Chamado não encontrado"));

        Orcamento orcamento = new Orcamento();
        orcamento.setValor(dto.valor());
        var savedOrcamento = orcamentoRepository.save(orcamento);

        ZoneId zone = ZoneId.of("America/Sao_Paulo");

        ch.setOrcamento(savedOrcamento);
        ch.setPrecoBase(savedOrcamento.getValor());
        ch.setDataResposta(ZonedDateTime.now(zone).toInstant());
        ch.setStatus(StatusConserto.ORCADA);
        ch.setComentario(dto.comentario());

        var savedChamado = chamadoRepository.save(ch);
        return toDTO(savedChamado);
    }

    private static ChamadoDTO toDTO(Chamado c) {
        return new ChamadoDTO(
        c.getId(),
        toClienteDTO(c.getCliente()),
        toFuncionarioDTO(c.getFuncionario()),
        c.getCategoriaEquipamento() != null ? c.getCategoriaEquipamento().getName() : null,
        c.getDescricaoEquipamento(),
        c.getDescricaoFalha(),
        c.getPrecoBase(),
        c.getComentario(),
        c.getStatus() != null ? c.getStatus().name() : null,
        c.getDataCriacao(),
        c.getDataResposta(),
        toEtapasDTO(c.getEtapas()),
        toOrcamentoDTO(c.getOrcamento())
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

    private static OrcamentoDTO toOrcamentoDTO(Orcamento o) {
        if (o == null) return null;
        return new OrcamentoDTO(o.getId(), o.getValor(), o.getComentario());
    }

    private static EtapaHistoricoDTO toEtapaDTO(EtapaHistorico e) {
        if (e == null) return null;
        return new EtapaHistoricoDTO(
        e.getId(),
        e.getStatus() != null ? e.getStatus().name() : null,
        e.getComentario(),
        e.getDataCriacao(),
        toFuncionarioDTO(e.getFuncionario()),
        e.getMotivoRejeicao()
        );
    }

    private static List<EtapaHistoricoDTO> toEtapasDTO(List<EtapaHistorico> etapas) {
        if (etapas == null || etapas.isEmpty()) return java.util.Collections.emptyList();
        return etapas.stream()
        .filter(Objects::nonNull)
        .map(ChamadoService::toEtapaDTO)
        .collect(Collectors.toList());
    }

}
