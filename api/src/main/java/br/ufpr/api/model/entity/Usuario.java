package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.RoleUsuario;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@Table(name = "tbl_usuario")
@EqualsAndHashCode(of = "id")
public abstract class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, length = 11)
    private String cpf;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private RoleUsuario role;
    @Column(nullable = false)
    private String senha;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.getRole()));
    }
}