package br.ufpr.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufpr.api.model.Usuario;
import br.ufpr.api.repo.UsuarioRepo;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepo usuarioRepo;

    public Usuario addNewUsuario(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }
}
