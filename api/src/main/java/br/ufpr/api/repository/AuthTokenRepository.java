package br.ufpr.api.repository;

import br.ufpr.api.model.entity.AuthToken;
import br.ufpr.api.model.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthTokenRepository extends JpaRepository<AuthToken, UUID> {
    boolean existsById(UUID id);
    Optional<AuthToken> findById(UUID id);
    Optional<AuthToken> findByToken(String token);
    boolean existsByToken(String token);
    void deleteByUserIdAndUserRole(UUID userId, UserRole userRole);
}
