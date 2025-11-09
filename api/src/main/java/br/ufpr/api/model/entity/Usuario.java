package br.ufpr.api.model.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_usuario")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "email", length = 100, nullable = false, unique = true) 
    private String email;

    @Column(name = "senha", length = 255, nullable = false) 
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, updatable = false) 
    private RoleUsuario role;

    @Column(name = "status", nullable = false)
    private boolean status = true; 

    //metodos user details
    @Override
    @JsonIgnore
    public String getPassword() {
        return this.senha;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return this.email;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.getRole()));
    }



    //GETTERS E SETTERS

    public Integer getIdUsuario() {
        return userId;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.userId = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public RoleUsuario getRole() {
        return role;
    }

    public void setRole(RoleUsuario role) {
        this.role = role;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}

