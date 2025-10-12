package br.ufpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.ufpr.api.model.entity.Cliente;
import br.ufpr.api.repository.ClienteRepository;
import br.ufpr.api.repository.FuncionarioRepository;

@Service
public class AuthorizationService implements UserDetailsService{

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDetails user = clienteRepository.findByEmail(username);
        
        if (user == null) {
            user = funcionarioRepository.findByEmail(username);
        }

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        
        return user;
    }

    public boolean existsByEmail(String login){
        UserDetails user = clienteRepository.findByEmail(login);

        if (user != null) return true;
        
        user = funcionarioRepository.findByEmail(login);

        if (user != null) return true;

        return false;
    }

    public void addCommonUser(String email, String encryptedPass){
        Cliente cl = new Cliente("123456789", "Da Silva", email, encryptedPass, "9999-9999");
        this.clienteRepository.save(cl);
    }
}
