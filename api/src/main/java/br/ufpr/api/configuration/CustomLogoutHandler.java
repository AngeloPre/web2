package br.ufpr.api.configuration;

import br.ufpr.api.model.enums.UserRole;
import br.ufpr.api.service.AuthTokenService;
import br.ufpr.api.service.ClientService;
import br.ufpr.api.service.EmployeeService;
import br.ufpr.api.service.RefreshTokenService;
import br.ufpr.api.util.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.UUID;

public class CustomLogoutHandler implements LogoutHandler {
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    ClientService clientService;
    @Autowired
    EmployeeService employeeService;
    @Autowired
    AuthTokenService authTokenService;
    @Autowired
    RefreshTokenService refreshTokenService;
    @CrossOrigin(origins = "http://localhost:4200")
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws AuthenticationException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            //token de autenticação não está presente na req
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }
        final String token = authHeader.substring(7);
        final UUID userId = UUID.fromString(jwtTokenUtil.extractSubject(token));
        final UserRole userRole = (UserRole) jwtTokenUtil.extractClaim(token, "role");

        try{
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                boolean isTokenValid = authTokenService.existsByToken(token);
                boolean hasUser = clientService.existsById(userId) || employeeService.existsById(userId);
                if(hasUser && isTokenValid){
                    authTokenService.deleteByUserIdAndUserRole(userId, userRole);
                    refreshTokenService.deleteByUserIdAndUserRole(userId, userRole);
                    SecurityContextHolder.clearContext();
                    response.setStatus(HttpStatus.OK.value());
                    return;
                }
                //caso contexto de autenticação não tiver registro do usuario/ usuario não existe/ token existe mas não é válido
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
            }
        } catch (Exception e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
    }
}
