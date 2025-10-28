package br.ufpr.api.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ufpr.api.dto.ChamadoCreateUpdateDTO;
import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.entity.Endereco;
import br.ufpr.api.model.entity.Funcionario;
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

        Cliente joao = (Cliente) usuarioRepository.findByEmail("joao@cliente.com");
        Cliente jose = (Cliente) usuarioRepository.findByEmail("jose@cliente.com");
        Cliente joana = (Cliente) usuarioRepository.findByEmail("joana@cliente.com");
        CategoriaEquipamento notebook =  categoriaEquipamentoRepo.findBySlug("notebook").orElse(null);
        CategoriaEquipamento impressora =  categoriaEquipamentoRepo.findBySlug("impressora").orElse(null);
        CategoriaEquipamento desktop = categoriaEquipamentoRepo.findBySlug("desktop").orElse(null);

        Funcionario mario = (Funcionario) usuarioRepository.findByEmail("mario@empresa.com");
        Funcionario maria = (Funcionario) usuarioRepository.findByEmail("maria@empresa.com");

        ChamadoCreateUpdateDTO c1 = new ChamadoCreateUpdateDTO(
        joao.getIdUsuario(), null, notebook.getCategoryId(),
        "Notebook Dell", "Tela piscando", new BigDecimal("250.00"), "Cliente relata falha ao ligar"
        );
        chamadoService.addNewChamado(c1);

        //ORÇADA
        ChamadoCreateUpdateDTO c2 = new ChamadoCreateUpdateDTO(
        jose.getIdUsuario(), mario.getIdUsuario(), impressora.getCategoryId(),
        "Impressora HP", "Não puxa papel", new BigDecimal("180.00"), null
        );
        var r2 = chamadoService.addNewChamado(c2);
        setStatus(r2.id(), StatusConserto.ORCADA, maria); // opcional: define funcionário

        //APROVADA
        ChamadoCreateUpdateDTO c3 = new ChamadoCreateUpdateDTO(
        joana.getIdUsuario(), mario.getIdUsuario(), desktop.getCategoryId(),
        "Desktop Office", "HD ruidoso", new BigDecimal("350.00"), null
        );
        var r3 = chamadoService.addNewChamado(c3);
        setStatus(r3.id(), StatusConserto.APROVADA, maria);

        //ARRUMADA
        ChamadoCreateUpdateDTO c4 = new ChamadoCreateUpdateDTO(
        jose.getIdUsuario(), maria.getIdUsuario(), notebook.getCategoryId(),
        "Notebook Lenovo", "Bateria não carrega", new BigDecimal("420.00"), null
        );
        var r4 = chamadoService.addNewChamado(c4);
        setStatus(r4.id(), StatusConserto.ARRUMADA, mario);

        //PAGA
        ChamadoCreateUpdateDTO c5 = new ChamadoCreateUpdateDTO(
        joao.getIdUsuario(), maria.getIdUsuario(), impressora.getCategoryId(),
        "Impressora Epson", "Erro desconhecido", new BigDecimal("260.00"), null
        );
        var r5 = chamadoService.addNewChamado(c5);
        setStatus(r5.id(), StatusConserto.PAGA, maria); // também marca dataResposta

        //FINALIZADA
        ChamadoCreateUpdateDTO c6 = new ChamadoCreateUpdateDTO(
        joana.getIdUsuario(), maria.getIdUsuario(), desktop.getCategoryId(),
        "Desktop Gamer", "Sem vídeo", new BigDecimal("500.00"), "Cabo de vídeo testado"
        );
        var r6 = chamadoService.addNewChamado(c6);
        setStatus(r6.id(), StatusConserto.FINALIZADA, mario);
    }

    private void setStatus(Integer chamadoId, StatusConserto status, Funcionario responsavel) {
        Chamado chamado = chamadoRepository.findById(chamadoId).orElse(null);
        chamado.setFuncionario(responsavel);
        chamado.setStatus(status);
        if (status == StatusConserto.PAGA) {
            chamado.setDataResposta(Instant.now());
        }
        chamadoRepository.save(chamado);
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

}
