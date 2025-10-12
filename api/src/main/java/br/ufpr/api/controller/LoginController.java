package br.ufpr.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.dto.LoginDTO;
import br.ufpr.api.dto.LoginResponseDTO;
import br.ufpr.api.model.entity.Usuario;
import br.ufpr.api.service.AuthorizationService;
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
    private AuthorizationService authorizationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody @Valid LoginDTO data) {
        var UsernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authenticated = this.authenticationManager.authenticate(UsernamePassword);
        
        var token = this.tokenService.generateToken((Usuario) authenticated.getPrincipal());

        return new LoginResponseDTO(token);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid LoginDTO data) {
        if (this.authorizationService.existsByEmail(data.email())) return ResponseEntity.badRequest().build(); 
        
        String encryptedPass = this.passwordEncoder.encode(data.password());
        this.authorizationService.addCommonUser(data.email(), encryptedPass);

        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/test")
    public String testResponse() {
        return "Rota Protegida";
    }
    
    
}
