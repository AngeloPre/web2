package br.ufpr.api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ufpr.api.model.entity.CategoriaEquipamento;
import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.model.entity.Endereco;
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.model.enums.RoleUsuario;
import br.ufpr.api.repository.CategoriaEquipamentoRepo;
import br.ufpr.api.repository.ClienteRepository;
import br.ufpr.api.repository.FuncionarioRepository;
import br.ufpr.api.repository.UsuarioRepository;

@Service
public class SeedService {

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
