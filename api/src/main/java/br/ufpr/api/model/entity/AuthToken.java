package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "tbl_auth_token")
public class AuthToken implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "uuid")
    private UUID id;
    @Column(nullable = false)
    private UUID userId;
    @Column (nullable = false)
    private UserRole userRole;
    @Column(nullable = false)
    private String token;
    @Column(nullable = false)
    private Date expirationDate;
}