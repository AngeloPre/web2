package br.ufpr.api.service;

import br.ufpr.api.model.entity.RefreshToken;
import br.ufpr.api.model.enums.UserRole;
import br.ufpr.api.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    @Autowired
    final RefreshTokenRepository refreshTokenRepository;
    @Transactional
    public RefreshToken save(RefreshToken token) {
        return refreshTokenRepository.save(token);
    }
    @Transactional
    public void deleteByUserIdAndUserRole(UUID userId, UserRole userRole) {
        refreshTokenRepository.deleteByUserIdAndUserRole(userId, userRole);
    }
    public Optional<RefreshToken> findById(UUID id) {
        return refreshTokenRepository.findById(id);
    }
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }
}