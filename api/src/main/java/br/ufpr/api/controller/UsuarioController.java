package br.ufpr.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.model.Usuario;
import br.ufpr.api.service.UsuarioService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UsuarioController {
    @Autowired
    private UsuarioService service;

    @PostMapping("/usuario")
    public Usuario addNewUsuario(@RequestBody Usuario newUsuario) {
        return service.addNewUsuario(newUsuario);
    }
}
