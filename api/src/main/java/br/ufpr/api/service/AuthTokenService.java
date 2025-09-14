package br.ufpr.api.service;

import br.ufpr.api.model.entity.AuthToken;
import br.ufpr.api.model.enums.UserRole;
import br.ufpr.api.repository.AuthTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthTokenService {
    @Autowired
    final AuthTokenRepository authTokenRepository;
    @Transactional
    public AuthToken save(AuthToken token) {
        return authTokenRepository.save(token);
    }
    @Transactional
    public void deleteByUserIdAndUserRole(UUID userId, UserRole userRole) {
        authTokenRepository.deleteByUserIdAndUserRole(userId, userRole);
    }
    public Optional<AuthToken> findById(UUID id) {
        return authTokenRepository.findById(id);
    }
    public Optional<AuthToken> findByToken(String token) {
        return authTokenRepository.findByToken(token);
    }
    public boolean existsByToken(String token) {
        return authTokenRepository.existsByToken(token);
    }
}