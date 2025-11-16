package br.ufpr.api.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import br.ufpr.api.model.entity.Usuario;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuario user) {
        try {
            Algorithm alg = Algorithm.HMAC256(secret);
            String token = JWT.create()
                .withIssuer("web2")
                .withSubject(user.getEmail())
                .withExpiresAt(generateExpirationDate())
                .withClaim("roles", user.getRole().toString())
                .withClaim("nome", user.getNome())
                .sign(alg);
            return token;
        } catch (JWTCreationException ex) {
            throw new RuntimeException("Error generating token");
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm alg = Algorithm.HMAC256(secret);
            return JWT.require(alg)
                    .withIssuer("web2")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException ex) {
            return null;
        }
    }

    private Instant generateExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}

