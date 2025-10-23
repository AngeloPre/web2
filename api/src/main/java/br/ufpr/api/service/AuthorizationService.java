package br.ufpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.ufpr.api.repository.UsuarioRepository;

@Service
public class AuthorizationService implements UserDetailsService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDetails user = usuarioRepository.findByEmail(username);
        
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        
        return user;
    }

    public boolean existsByEmail(String login){
        UserDetails user = usuarioRepository.findByEmail(login);

        if (user != null) return true;
        
        return false;
    }
}
