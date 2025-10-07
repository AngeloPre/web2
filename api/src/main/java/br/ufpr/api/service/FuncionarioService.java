package br.ufpr.api.service;

import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FuncionarioService {
    @Autowired
    FuncionarioRepository employeeRepository;

    @Transactional
    public Funcionario save(Funcionario employee) {
        return employeeRepository.save(employee);
    }
    @Transactional
    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }
    public List<Funcionario> findAll() {
        return employeeRepository.findAll();
    }
    public Optional<Funcionario> findById(Long id) {
        return employeeRepository.findById(id);
    }
    public Optional<Funcionario> findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
    public boolean existsByEmail(String email) {
        return employeeRepository.existsByEmail(email);
    }
    public boolean existsByCpf(String cpf) {
        return employeeRepository.existsByCpf(cpf);
    }
    public boolean existsById(Long id) {
        return employeeRepository.existsById(id);
    }
}