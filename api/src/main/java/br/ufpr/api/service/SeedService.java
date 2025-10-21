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
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.model.enums.RoleUsuario;
import br.ufpr.api.repository.CategoriaEquipamentoRepo;
import br.ufpr.api.repository.FuncionarioRepository;

@Service
public class SeedService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    CategoriaEquipamentoRepo categoriaEquipamentoRepo;

    public Funcionario createAdminUser() {
        if (!funcionarioRepository.existsByEmail("admino@admin.com"))
        {
            Funcionario f = new Funcionario();
            f.setAniversario(LocalDate.now());
            f.setRole(RoleUsuario.FUNCIONARIO);
            f.setEmail("admino@admin.com");
            f.setNome("admino");
            f.setSenha(passwordEncoder.encode("1234"));
        
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
                cat.setDescription(c);

                listCat.add(categoriaEquipamentoRepo.save(cat));
            }
        }
        return listCat;
    }

}
