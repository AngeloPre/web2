package br.ufpr.api.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ufpr.api.dto.ChamadoCreateDTO;
import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.entity.Endereco;
import br.ufpr.api.model.entity.EtapaHistorico;
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.model.entity.Orcamento;
import br.ufpr.api.model.enums.RoleUsuario;
import br.ufpr.api.model.enums.StatusConserto;
import br.ufpr.api.repository.CategoriaEquipamentoRepo;
import br.ufpr.api.repository.ChamadoRepository;
import br.ufpr.api.repository.ClienteRepository;
import br.ufpr.api.repository.FuncionarioRepository;
import br.ufpr.api.repository.UsuarioRepository;

@Service
public class SeedService {

    @Autowired
    ChamadoService chamadoService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    CategoriaEquipamentoRepo categoriaEquipamentoRepo;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ChamadoRepository chamadoRepository;



    public Funcionario createAdminUser() {
        if (!usuarioRepository.existsByEmail("admino@admin.com"))
        {
            Funcionario f = new Funcionario();
            f.setDataNascimento(LocalDate.now());
            f.setRole(RoleUsuario.FUNCIONARIO);
            f.setEmail("admino@admin.com");
            f.setNome("admino");
            f.setSenha(passwordEncoder.encode("1234"));
            f.setStatus(true);

            return funcionarioRepository.save(f);
        }
        return null;
    }

    public List<CategoriaEquipamento> createDefaultEquipments() {
        String[] equipamentos = {"Notebook", "Desktop", "Impressora", "Mouse", "Teclado"};
        List<CategoriaEquipamento> listCat = new ArrayList<>();
        for (String c : equipamentos) {
            if (!categoriaEquipamentoRepo.existsBySlug(c.toLowerCase())) {
                CategoriaEquipamento cat = new CategoriaEquipamento();
                cat.setName(c);
                cat.setSlug(c.toLowerCase());
                cat.setBaseValue(Long.valueOf(1000));
                cat.setCreatedAt(LocalDateTime.now().toInstant(ZoneOffset.of("-03:00")));
                cat.setStatus(true);

                listCat.add(categoriaEquipamentoRepo.save(cat));
            }
        }
        return listCat;
    }

    public void createDefaultFuncionarios() {
        if (!usuarioRepository.existsByEmail("maria@empresa.com")) {
            Funcionario maria = new Funcionario();
            maria.setNome("Maria");
            maria.setEmail("maria@empresa.com");
            maria.setSenha(passwordEncoder.encode("1234"));
            maria.setDataNascimento(LocalDate.of(1990, 1, 15));
            maria.setRole(RoleUsuario.FUNCIONARIO);
            maria.setStatus(true);
            funcionarioRepository.save(maria);
        }

        if (!usuarioRepository.existsByEmail("mario@empresa.com")) {
            Funcionario mario = new Funcionario();
            mario.setNome("Mário");
            mario.setEmail("mario@empresa.com");
            mario.setSenha(passwordEncoder.encode("4567"));
            mario.setDataNascimento(LocalDate.of(1985, 5, 20));
            mario.setRole(RoleUsuario.FUNCIONARIO);
            mario.setStatus(true);
            funcionarioRepository.save(mario);
        }
    }

    public void createDefaultChamados() {

        // Clientes e categorias
        Cliente joao     = (Cliente) usuarioRepository.findByEmail("joao@cliente.com");
        Cliente jose     = (Cliente) usuarioRepository.findByEmail("jose@cliente.com");
        Cliente joana    = (Cliente) usuarioRepository.findByEmail("joana@cliente.com");
        Cliente joaquina = (Cliente) usuarioRepository.findByEmail("joaquina@cliente.com");

        CategoriaEquipamento notebook  = categoriaEquipamentoRepo.findBySlug("notebook").orElse(null);
        CategoriaEquipamento impressora= categoriaEquipamentoRepo.findBySlug("impressora").orElse(null);
        CategoriaEquipamento desktop   = categoriaEquipamentoRepo.findBySlug("desktop").orElse(null);
        CategoriaEquipamento mouse     = categoriaEquipamentoRepo.findBySlug("mouse").orElse(null);
        CategoriaEquipamento teclado   = categoriaEquipamentoRepo.findBySlug("teclado").orElse(null);

        // Técnicos (funcionários)
        Funcionario mario = (Funcionario) usuarioRepository.findByEmail("mario@empresa.com");
        Funcionario maria = (Funcionario) usuarioRepository.findByEmail("maria@empresa.com");

        // Opcional: criar "Ramon Alves" para refletir o mock do frontend
        Funcionario ramon = (Funcionario) usuarioRepository.findByEmail("ramon@empresa.com");
        if (ramon == null) {
            ramon = new Funcionario();
            ramon.setNome("Ramon Alves");
            ramon.setEmail("ramon@empresa.com");
            ramon.setSenha(passwordEncoder.encode("1234"));
            ramon.setDataNascimento(LocalDate.of(1992, 3, 10));
            ramon.setRole(RoleUsuario.FUNCIONARIO);
            ramon.setStatus(true);
            ramon = funcionarioRepository.save(ramon);
        }

        // ===== 1) João - Notebook - FINALIZADA =====
        {
            Chamado ch = novoChamado(joao, mario, notebook, "Notebook Dell",
            "Descrição do chamado 2", new BigDecimal("250.00"), null);

            applyStep(ch, StatusConserto.ABERTA,      ramon, at(2025,3,12,9,12), null, null, null);
            applyStep(ch, StatusConserto.ORCADA,      ramon, at(2025,3,13,9,12), null, null, new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.REJEITADA,   ramon, at(2025,3,14,9,12), null,
            "Este preço não condiz com o serviço solicitado.", new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.ORCADA,      ramon, at(2025,3,15,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.APROVADA,    ramon, at(2025,3,16,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.REDIRECIONADA,ramon, at(2025,3,16,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.ARRUMADA,    ramon, at(2025,3,17,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.PAGA,        ramon, at(2025,3,17,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.FINALIZADA,  ramon, at(2025,3,18,9,12), null, null, new BigDecimal("100.00"));

            chamadoRepository.save(ch);
        }

        // ===== 2) João - Impressora - PAGA =====
        {
            Chamado ch = novoChamado(joao, mario, impressora, "Impressora HP",
            "Descrição do chamado 2", new BigDecimal("395.00"), null);

            applyStep(ch, StatusConserto.ABERTA,    ramon, at(2025,3,12,9,12), null, null, null);
            applyStep(ch, StatusConserto.ORCADA,    ramon, at(2025,3,13,9,12), null, null, new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.REJEITADA, ramon, at(2025,3,14,9,12), null,
            "Este preço não condiz com o serviço solicitado.", new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.ORCADA,    ramon, at(2025,3,15,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.APROVADA,  ramon, at(2025,3,16,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.PAGA,      ramon, at(2025,3,17,9,12), null, null, new BigDecimal("100.00"));

            chamadoRepository.save(ch);
        }

        // ===== 3) José - Mouse - ARRUMADA =====
        {
            Chamado ch = novoChamado(jose, ramon, mouse, "Mouse Razer",
            "Descrição do chamado 3", new BigDecimal("75.00"), null);

            applyStep(ch, StatusConserto.ABERTA,    ramon, at(2025,3,12,9,12), null, null, null);
            applyStep(ch, StatusConserto.ORCADA,    ramon, at(2025,3,13,9,12), null, null, new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.REJEITADA, ramon, at(2025,3,14,9,12), null,
            "Este preço não condiz com o serviço solicitado.", new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.ORCADA,    ramon, at(2025,3,15,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.APROVADA,  ramon, at(2025,3,16,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.REDIRECIONADA, ramon, at(2025,3,16,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.ARRUMADA,  ramon, at(2025,3,17,9,12), null, null, new BigDecimal("100.00"));

            chamadoRepository.save(ch);
        }

        // ===== 4) José - Desktop - REDIRECIONADA =====
        {
            Chamado ch = novoChamado(jose, maria, desktop, "Desktop Dell",
            "Descrição do chamado 4", new BigDecimal("450.00"), null);

            applyStep(ch, StatusConserto.ABERTA,      ramon, at(2025,3,12,9,12), null, null, null);
            applyStep(ch, StatusConserto.ORCADA,      ramon, at(2025,3,13,9,12), null, null, new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.REJEITADA,   ramon, at(2025,3,14,9,12), null,
            "Este preço não condiz com o serviço solicitado.", new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.ORCADA,      ramon, at(2025,3,15,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.APROVADA,    ramon, at(2025,3,16,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.REDIRECIONADA,ramon, at(2025,3,16,9,12), null, null, new BigDecimal("100.00"));

            chamadoRepository.save(ch);
        }

        // ===== 5) Joana - Teclado - APROVADA =====
        {
            Chamado ch = novoChamado(joana, maria, teclado, "Teclado Logitec",
            "Descrição do chamado 5", new BigDecimal("120.00"), null);

            applyStep(ch, StatusConserto.ABERTA,    ramon, at(2025,3,12,9,12), null, null, null);
            applyStep(ch, StatusConserto.ORCADA,    ramon, at(2025,3,13,9,12), null, null, new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.REJEITADA, ramon, at(2025,3,14,9,12), null,
            "Este preço não condiz com o serviço solicitado.", new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.ORCADA,    ramon, at(2025,3,15,9,12), null, null, new BigDecimal("100.00"));
            applyStep(ch, StatusConserto.APROVADA,  ramon, at(2025,3,16,9,12), null, null, new BigDecimal("100.00"));

            chamadoRepository.save(ch);
        }

        // ===== 6) Joana - Impressora - REJEITADA =====
        {
            Chamado ch = novoChamado(joana, maria, impressora, "Impressora Epson",
            "Descrição do chamado 6", new BigDecimal("420.00"), null);

            applyStep(ch, StatusConserto.ABERTA,    ramon, at(2025,3,12,9,12), null, null, null);
            applyStep(ch, StatusConserto.ORCADA,    ramon, at(2025,3,13,9,12), null, null, new BigDecimal("120.00"));
            applyStep(ch, StatusConserto.REJEITADA, ramon, at(2025,3,14,9,12), null,
            "Este preço não condiz com o serviço solicitado.", new BigDecimal("120.00"));

            chamadoRepository.save(ch);
        }

        // ===== 7) Joaquina - Desktop - ORCADA =====
        {
            Chamado ch = novoChamado(joaquina, maria, desktop, "Desktop Customizado",
            "Descrição do chamado 7", new BigDecimal("780.00"), null);

            applyStep(ch, StatusConserto.ABERTA, ramon, at(2025,3,12,9,12), null, null, null);
            applyStep(ch, StatusConserto.ORCADA, ramon, at(2025,3,13,9,12), null, null, new BigDecimal("120.00"));

            chamadoRepository.save(ch);
        }

        // ===== 8) Joaquina - Notebook - ABERTA =====
        {
            Chamado ch = novoChamado(joaquina, null, notebook, "Notebook Avell",
            "Descrição do chamado 8", new BigDecimal("325.00"), null);

            applyStep(ch, StatusConserto.ABERTA, ramon, at(2025,3,12,9,12), null, null, null);

            chamadoRepository.save(ch);
        }

        // ===== 9) Joaquina - Notebook - ABERTA =====
        {
            Chamado ch = novoChamado(joaquina, null, notebook, "Notebook Lenovo",
            "Descrição do chamado 9", new BigDecimal("1200.00"), null);

            applyStep(ch, StatusConserto.ABERTA, ramon, at(2025,3,12,9,12), null, null, null);

            chamadoRepository.save(ch);
        }

        // ===== 10) João - Impressora - ABERTA =====
        {
            Chamado ch = novoChamado(joao, null, impressora, "Impressora HP",
            "Descrição do chamado 10", new BigDecimal("1200.00"), null);

            // sem etapas no mock -> adiciono ABERTA para manter histórico mínimo
            applyStep(ch, StatusConserto.ABERTA, ramon, Instant.now(), null, null, null);

            chamadoRepository.save(ch);
        }

        // ===== 11) Joana - Desktop - ABERTA =====
        {
            Chamado ch = novoChamado(joana, null, desktop, "Desktop Alienware",
            "Descrição do chamado 11", new BigDecimal("1200.00"), null);

            applyStep(ch, StatusConserto.ABERTA, ramon, at(2025,9,18,11,32), null, null, null);

            chamadoRepository.save(ch);
        }

        // ===== 12) Joana - Teclado - ABERTA =====
        {
            Chamado ch = novoChamado(joana, null, teclado, "Teclado Redragon",
            "Descrição do chamado 12", new BigDecimal("1200.00"), null);

            applyStep(ch, StatusConserto.ABERTA, ramon, at(2025,3,12,9,12), null, null, null);

            chamadoRepository.save(ch);
        }
    }

    public void createDefaultClientes() {
        if (!usuarioRepository.existsByEmail("joao@cliente.com")) {
            Cliente joao = new Cliente();
            joao.setNome("João");
            joao.setEmail("joao@cliente.com");
            joao.setCpf("11111111111");
            joao.setTelefone("41911111111");
            joao.setRole(RoleUsuario.CLIENTE);
            joao.setStatus(true);

            joao.setSenha(passwordEncoder.encode("0123"));

            Endereco endJoao = new Endereco();
            endJoao.setCep("80000001");
            endJoao.setLogradouro("Rua Fictícia 1");
            endJoao.setNumero("100");
            endJoao.setBairro("Bairro 1");
            endJoao.setCidade("Curitiba");
            endJoao.setUf("PR");
            joao.setEndereco(endJoao);

            clienteRepository.save(joao);
        }

        if (!usuarioRepository.existsByEmail("jose@cliente.com")) {
            Cliente jose = new Cliente();
            jose.setNome("José");
            jose.setEmail("jose@cliente.com");
            jose.setCpf("22222222222");
            jose.setTelefone("41922222222");
            jose.setRole(RoleUsuario.CLIENTE);
            jose.setStatus(true);

            jose.setSenha(passwordEncoder.encode("3210"));

            Endereco endJose = new Endereco();
            endJose.setCep("80000002");
            endJose.setLogradouro("Rua Fictícia 2");
            endJose.setNumero("200");
            endJose.setBairro("Bairro 2");
            endJose.setCidade("Curitiba");
            endJose.setUf("PR");
            jose.setEndereco(endJose);
            clienteRepository.save(jose);
        }

        if (!usuarioRepository.existsByEmail("joana@cliente.com")) {
            Cliente joana = new Cliente();
            joana.setNome("Joana");
            joana.setEmail("joana@cliente.com");
            joana.setCpf("33333333333");
            joana.setTelefone("41933333333");
            joana.setRole(RoleUsuario.CLIENTE);
            joana.setStatus(true);

            joana.setSenha(passwordEncoder.encode("9876"));

            Endereco endJoana = new Endereco();
            endJoana.setCep("80000003");
            endJoana.setLogradouro("Rua Fictícia 3");
            endJoana.setNumero("300");
            endJoana.setBairro("Bairro 3");
            endJoana.setCidade("Curitiba");
            endJoana.setUf("PR");
            joana.setEndereco(endJoana);
            clienteRepository.save(joana);
        }

        if (!usuarioRepository.existsByEmail("joaquina@cliente.com")) {
            Cliente joaquina = new Cliente();
            joaquina.setNome("Joaquina");
            joaquina.setEmail("joaquina@cliente.com");
            joaquina.setCpf("44444444444");
            joaquina.setTelefone("41944444444");
            joaquina.setRole(RoleUsuario.CLIENTE);
            joaquina.setStatus(true);

            joaquina.setSenha(passwordEncoder.encode("4521"));

            Endereco endJoaquina = new Endereco();
            endJoaquina.setCep("80000004");
            endJoaquina.setLogradouro("Rua Fictícia 4");
            endJoaquina.setNumero("400");
            endJoaquina.setBairro("Bairro 4");
            endJoaquina.setCidade("Curitiba");
            endJoaquina.setUf("PR");
            joaquina.setEndereco(endJoaquina);
            clienteRepository.save(joaquina);
        }
    }

    private Instant at(int year, int month, int day, int hour, int minute) {
        // month: 1=Jan ... 12=Dez
        return LocalDateTime.of(year, month, day, hour, minute).toInstant(ZoneOffset.of("-03:00"));
    }
    private void applyStep(Chamado ch,
    StatusConserto status,
    Funcionario resp,
    Instant when,
    String comentario,
    String motivoRejeicao,
    BigDecimal orcamentoSeHouver) {
        // cria a etapa
        EtapaHistorico e = new EtapaHistorico();
        e.setChamado(ch);
        e.setStatus(status);
        e.setFuncionario(resp);
        e.setComentario(comentario);
        e.setMotivoRejeicao(motivoRejeicao);
        // e.setDataCriacao(when); // @CreationTimestamp geralmente sobrescreve; manterá a ordem de inserção

        ch.getEtapas().add(e);

        // estado atual do chamado
        ch.setStatus(status);

        // orçamento no Chamado (1:1) - usa o valor "vigente" (ex.: o aprovado)
        if (orcamentoSeHouver != null) {
            if (ch.getOrcamento() == null) {
                Orcamento o = new Orcamento();
                o.setValor(orcamentoSeHouver);
                ch.setOrcamento(o); // precisa CascadeType.ALL no mapeamento para persistir junto
            } else {
                ch.getOrcamento().setValor(orcamentoSeHouver);
            }
        }

        if (status == StatusConserto.PAGA || status == StatusConserto.FINALIZADA) {
            // apenas para demonstrar o preenchimento; ajuste se quiser usar "when"
            ch.setDataResposta(Instant.now());
        }
    }

    private Chamado novoChamado(Cliente cliente,
    Funcionario funcionario,
    CategoriaEquipamento categoria,
    String descEquip,
    String descFalha,
    BigDecimal precoBase,
    String comentario) {

        var dto = new ChamadoCreateDTO(
        categoria.getName(),
        descEquip,
        descFalha
        //precoBase,
        //comentario
        );
        var dtoResp = chamadoService.addNewChamado(dto, (UserDetails) cliente);
        return chamadoRepository.findById(dtoResp.id()).orElseThrow();
    }
}
