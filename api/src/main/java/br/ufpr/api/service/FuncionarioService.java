package br.ufpr.api.service;

import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
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
    public List<Funcionario> getTodos() {
        return employeeRepository.findAll();
    }
    public Optional<Funcionario> encontrarPorId(Long id) {
        return employeeRepository.findById(id);
    }
    public UserDetails encontrarPorEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
    public boolean existePorEmail(String email) {
        return employeeRepository.existsByEmail(email);
    }
    public boolean existePorCpf(String cpf) {
        return employeeRepository.existsByCpf(cpf);
    }
    public boolean existePorId(Long id) {
        return employeeRepository.existsById(id);
    }
}