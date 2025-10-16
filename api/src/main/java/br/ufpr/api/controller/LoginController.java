package br.ufpr.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.dto.ClienteRegisterDTO;
import br.ufpr.api.dto.LoginDTO;
import br.ufpr.api.dto.LoginResponseDTO;
import br.ufpr.api.model.entity.Usuario;
import br.ufpr.api.service.ClienteService;
import br.ufpr.api.service.TokenService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("auth")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody @Valid LoginDTO data) {
        var UsernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authenticated = this.authenticationManager.authenticate(UsernamePassword);
        
        var token = this.tokenService.generateToken((Usuario) authenticated.getPrincipal());

        return new LoginResponseDTO(token);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid ClienteRegisterDTO data) {
        try {
            clienteService.registrarCliente(data);
            return ResponseEntity.status(201).body("cliente registrado!");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/me")
    public String testResponse(@AuthenticationPrincipal UserDetails activeUser) {
        return "Você é: " + activeUser.getUsername();
    }
}
