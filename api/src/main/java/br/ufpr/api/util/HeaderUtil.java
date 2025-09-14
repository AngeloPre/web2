package br.ufpr.api.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class HeaderUtil {
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    public Optional<UUID> getUserIdFromAuthHeader(String authHeader) {
        if (authHeader == null|| !authHeader.startsWith("Bearer ")) {
            return Optional.empty();
        }
        final String token = authHeader.substring(7);
        final UUID userId = UUID.fromString(jwtTokenUtil.extractSubject(token));
        return Optional.of(userId);
    }
}
