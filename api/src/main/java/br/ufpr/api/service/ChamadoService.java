package br.ufpr.api.service;

import java.math.BigDecimal;
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

import br.ufpr.api.dto.ChamadoCreateDTO;
import br.ufpr.api.dto.ChamadoDTO;
import br.ufpr.api.dto.ChamadoUpdateDTO;
import br.ufpr.api.dto.ClienteDTO;
import br.ufpr.api.dto.EnderecoDTO;
import br.ufpr.api.dto.EtapaCreateDTO;
import br.ufpr.api.dto.EtapaHistoricoDTO;
import br.ufpr.api.dto.FuncionarioDTO;
import br.ufpr.api.dto.OrcamentoDTO;
import br.ufpr.api.exception.BadRequestApiException;
import br.ufpr.api.exception.ResourceConflictException;
import br.ufpr.api.exception.ResourceForbiddenException;
import br.ufpr.api.exception.ResourceNotFoundException;
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

    public ChamadoDTO addNewChamado(ChamadoCreateDTO dto, UserDetails activeUser) {
        if (!(activeUser instanceof Cliente)) {
            throw new ResourceForbiddenException("Apenas clientes podem criar chamados");
        }

        Cliente cliente = (Cliente) activeUser;

        String slug = dto.categoriaNome().toLowerCase().replace(" ", "-");
        CategoriaEquipamento categoria = categoriaRepo.findBySlug(slug)
            .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        var ch = new Chamado();
        ch.setCliente(cliente);
        ch.setFuncionario(null);
        ch.setCategoriaEquipamento(categoria);
        ch.setDescricaoEquipamento(dto.descricaoEquipamento());
        ch.setDescricaoFalha(dto.descricaoFalha());
        ch.setPrecoBase(BigDecimal.valueOf(categoria.getBaseValue() / 100));

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
    public ChamadoDTO updateChamado(Integer id, ChamadoUpdateDTO dto, UserDetails activeUser) {
        Chamado ch = chamadoRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Chamado não encontrado"));

        //Cliente cliente = clienteRepository.findById(dto.clienteId())
        //.orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
        String slug = dto.categoriaNome().toLowerCase().replace(" ", "-");
        CategoriaEquipamento categoria = categoriaRepo.findBySlug(slug)
            .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        Funcionario funcionario = null;
        //if (dto.funcionarioId() != null) {
        //    funcionario = funcionarioRepository.findById(dto.funcionarioId())
        //    .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado"));
        //}

        //ch.setCliente(cliente);                    // sempre tem cliente
        ch.setFuncionario(funcionario);            // pode nao ter um (quando criada)
        ch.setCategoriaEquipamento(categoria);
        ch.setDescricaoEquipamento(dto.descricaoEquipamento());
        ch.setDescricaoFalha(dto.descricaoFalha());
        //ch.setPrecoBase(dto.precoBase());
        //ch.setComentario(dto.comentario());

        var saved = chamadoRepository.save(ch);
        return toDTO(saved);
    }

    @Transactional
    public ChamadoDTO efetuarOrcamento(Integer id, OrcamentoDTO dto, UserDetails activeUser) {

        if (!(activeUser instanceof Funcionario)) {
            throw new ResourceForbiddenException("Ação não permitida");
        }

        Funcionario funcionario = (Funcionario) activeUser;

        Chamado ch = chamadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chamado não encontrado"));

        if (ch.getStatus() != StatusConserto.ABERTA) {
            throw new ResourceConflictException("Apenas um orçamento por chamado");
        }

        Orcamento orcamento = new Orcamento();
        orcamento.setValor(dto.valor());
        orcamento.setComentario(dto.comentario());
        Orcamento savedOrcamento = orcamentoRepository.save(orcamento);

        ZoneId zone = ZoneId.of("America/Sao_Paulo");

        ch.setOrcamento(savedOrcamento);
        ch.setPrecoBase(savedOrcamento.getValor());
        ch.setDataResposta(ZonedDateTime.now(zone).toInstant());
        ch.setStatus(StatusConserto.ORCADA);
        ch.setFuncionario(funcionario);

        Chamado savedChamado = chamadoRepository.save(ch);
        return toDTO(savedChamado);
    }

    @Transactional
    public ChamadoDTO novaEtapa(Integer chamadoId, EtapaCreateDTO dto) {
        Chamado chamado = chamadoRepository.findById(chamadoId)
            .orElseThrow(() -> new ResourceNotFoundException("Chamado não encontrado"));

        switch (dto.status()) {
            case ORCADA      -> require(dto.valorOrcamento() != null, "valorOrcamento obrigatório");
            case REJEITADA   -> require(notBlank(dto.motivoRejeicao()), "motivoRejeicao obrigatório");
            case REDIRECIONADA -> {
                //TODO
            }
            case ARRUMADA    -> require(notBlank(dto.descricaoManutencao()), "descricaoManutencao obrigatória");
            case PAGA, FINALIZADA, ABERTA, APROVADA -> { /* sem extras obrigatórios */ }
        }

        // cria etapa
        EtapaHistorico etapa = new EtapaHistorico();
        etapa.setChamado(chamado);
        etapa.setStatus(dto.status());
        etapa.setFuncionario(chamado.getFuncionario());
        etapa.setComentario(dto.comentario());
        etapa.setMotivoRejeicao(dto.motivoRejeicao());
        chamado.getEtapas().add(etapa);

        // efeitos colaterais no Chamado
        switch (dto.status()) {
            case ORCADA -> chamado.getOrcamento().setValor(dto.valorOrcamento());
            case REDIRECIONADA -> {
                Funcionario destino = funcionarioRepository.findById(dto.funcionarioDestinoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Funcionário de destino não encontrado"));
                chamado.setFuncionario(destino);
            }
            case ARRUMADA -> { /*ver se precisa fazer algo*/ }
            case PAGA, FINALIZADA -> chamado.setDataResposta(Instant.now());
            default -> {}
        }

        chamado.setStatus(dto.status());
        Chamado salvo = chamadoRepository.save(chamado);
        return toDTO(salvo);
    }

    private static ChamadoDTO toDTO(Chamado c) {
        return new ChamadoDTO(
        c.getId(),
        c.getCliente().getNome(),
        c.getFuncionario() != null ? c.getFuncionario().getNome() : null,
        c.getCategoriaEquipamento() != null ? c.getCategoriaEquipamento().getName() : null,
        c.getDescricaoEquipamento(),
        c.getDescricaoFalha(),
        c.getPrecoBase(),
        c.getOrcamento() != null ? c.getOrcamento().getComentario() : null,
        c.getStatus() != null ? c.getStatus().name() : null,
        c.getDataCriacao(),
        c.getDataResposta(),
        //toEtapasDTO(c.getEtapas()),
        c.getOrcamento() != null ? c.getOrcamento().getValor() : null
        //toOrcamentoDTO(c.getOrcamento())
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
        e.getCep(), e.getLogradouro(), e.getComplemento(), e.getNumero(),
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

    private static void require(boolean condicao, String msg) {
        if (!condicao) {
            throw new BadRequestApiException(msg);
        }
    }

    private static boolean notBlank(String s) {
        return s != null && !s.isBlank();
    }

}
