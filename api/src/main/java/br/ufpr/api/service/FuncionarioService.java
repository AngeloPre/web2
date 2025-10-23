package br.ufpr.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.repository.FuncionarioRepository;
import br.ufpr.api.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<Funcionario> getAllFuncionarios(){
        return funcionarioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Funcionario buscarPorId(Integer id) {
        return funcionarioRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Funcionario não encontrado"));
    }

    @Transactional
    public Funcionario addNewFuncionario(Funcionario funcionario){
        if (usuarioRepository.existsByEmail(funcionario.getEmail())){
            throw new IllegalArgumentException("ERRO: Email já cadastrado");
        } 

        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));
        funcionario.setStatus(true);

        return funcionarioRepository.save(funcionario);
    }

    @Transactional
    public Funcionario updateFuncionario(Integer id, Funcionario funcionarioAtualizado){
        Funcionario funcionarioExistente = buscarPorId(id);

        if (!funcionarioExistente.getEmail().equals(funcionarioAtualizado.getEmail()) &&
            usuarioRepository.existsByEmail(funcionarioAtualizado.getEmail())) {
            throw new IllegalArgumentException("ERRO: Email já cadastrado");
        }

        funcionarioExistente.setNome(funcionarioAtualizado.getNome());
        funcionarioExistente.setEmail(funcionarioAtualizado.getEmail());
        funcionarioExistente.setSenha(passwordEncoder.encode(funcionarioAtualizado.getSenha()));
        funcionarioExistente.setDataNascimento(funcionarioAtualizado.getDataNascimento());
        funcionarioExistente.setStatus(funcionarioAtualizado.isStatus());
        
        return funcionarioRepository.save(funcionarioExistente);
    }

    @Transactional
    public void deleteFuncionario(Integer id){
        Funcionario funcionario = buscarPorId(id);
        
        funcionario.setStatus(false);
        funcionarioRepository.save(funcionario);

        //implementar regra que o funcionario nao pode deletar a si mesmo 
        // + regra que impede funcionario deletar o ultimo funcionario ativo
    }

}
