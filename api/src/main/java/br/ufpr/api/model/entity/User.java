package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS) //uma tabela separada para cada subclasse concreta (User não tem tabela individual)
@Data
public abstract class User implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "uuid")
    private UUID id;

    @Column(nullable = false, length = 11)
    private String cpf;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private UserRole role;
    @Column(nullable = false, length = 4)
    private String password;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
}
