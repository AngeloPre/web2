package br.ufpr.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ufpr.api.dto.FuncionarioCreateUpdateDTO;
import br.ufpr.api.dto.FuncionarioDTO;
import br.ufpr.api.exception.ResourceConflictException;
import br.ufpr.api.exception.ResourceForbiddenException;
import br.ufpr.api.exception.ResourceNotFoundException;
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.repository.FuncionarioRepository;
import br.ufpr.api.repository.UsuarioRepository;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<Funcionario> getAllFuncionariosAtivos(){
        return funcionarioRepository.findByStatus(true);
    }

    @Transactional(readOnly = true)
    public Funcionario buscarPorId(Integer id) {
        return funcionarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado"));
    }

    @Transactional
    public Funcionario addNewFuncionario(FuncionarioCreateUpdateDTO funcionario){

        if (usuarioRepository.existsByEmail(funcionario.email())){
            throw new ResourceConflictException("Funcionário já existe");
        } 

        Funcionario newFuncionario = this.fromDTO(funcionario);

        newFuncionario.setSenha(passwordEncoder.encode(newFuncionario.getSenha()));
        newFuncionario.setStatus(true);

        return funcionarioRepository.save(newFuncionario);
    }

    @Transactional
    public Funcionario updateFuncionario(Integer id, FuncionarioCreateUpdateDTO funcionarioAtualizado){
        Funcionario funcionarioExistente = buscarPorId(id);

        if (!funcionarioExistente.getEmail().equals(funcionarioAtualizado.email()) &&
            usuarioRepository.existsByEmail(funcionarioAtualizado.email())) {
            throw new ResourceConflictException("Email já cadastrado");
        }

        funcionarioExistente.setNome(funcionarioAtualizado.nome());
        funcionarioExistente.setEmail(funcionarioAtualizado.email());
        funcionarioExistente.setSenha(passwordEncoder.encode(funcionarioAtualizado.senha()));
        funcionarioExistente.setDataNascimento(funcionarioAtualizado.dataNascimento());
        
        return funcionarioRepository.save(funcionarioExistente);
    }

    @Transactional
    public void deleteFuncionario(Integer id, UserDetails activeUser){
        Funcionario funcionario = buscarPorId(id);
        
        if (funcionario.getEmail().equals(activeUser.getUsername())) {
            throw new ResourceForbiddenException("Funcionario não pode excluir a si mesmo");
        }

        if(funcionario.isStatus()){
            long funcionariosAtivos = funcionarioRepository.countByStatusTrue();
            if(funcionariosAtivos <= 2){
                throw new ResourceForbiddenException("Não é possível excluir o último funcionário ativo");
            }
        }

        funcionario.setStatus(false);
        funcionarioRepository.save(funcionario); 
    }

    public FuncionarioDTO toDTO(Funcionario funcionario) {
        return new FuncionarioDTO(
            funcionario.getIdUsuario(),
            funcionario.getNome(),
            funcionario.getEmail(),
            funcionario.getDataNascimento());
    }

    public Funcionario fromDTO(FuncionarioCreateUpdateDTO funcionarioDTO) {
        Funcionario func = new Funcionario();
        func.setDataNascimento(funcionarioDTO.dataNascimento());
        func.setEmail(funcionarioDTO.email());
        func.setNome(funcionarioDTO.nome());
        func.setSenha(funcionarioDTO.senha());
        return func;
    }
}
