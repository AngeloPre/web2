package br.ufpr.api.repository;

import br.ufpr.api.model.entity.RefreshToken;
import br.ufpr.api.model.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    boolean existsById(UUID id);
    Optional<RefreshToken> findById(UUID id);
    Optional<RefreshToken> findByToken(String token);
    void deleteByUserIdAndUserRole(UUID userId, UserRole userRole);
}
