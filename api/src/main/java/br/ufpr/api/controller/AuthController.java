package br.ufpr.api.controller;

import br.ufpr.api.configuration.CustomAuthenticationProvider;
import br.ufpr.api.dto.ClientRegisterDto;
import br.ufpr.api.dto.UserLoginDto;
import br.ufpr.api.dto.UserRefreshTokenDto;
import br.ufpr.api.model.data.TokenExpiration;
import br.ufpr.api.model.data.UserDescription;
import br.ufpr.api.model.entity.AuthToken;
import br.ufpr.api.model.entity.Client;
import br.ufpr.api.model.entity.Employee;
import br.ufpr.api.model.entity.RefreshToken;
import br.ufpr.api.model.enums.UserRole;
import br.ufpr.api.model.response.BaseResponse;
import br.ufpr.api.model.response.ClientAuthResponse;
import br.ufpr.api.model.response.EmployeeAuthResponse;
import br.ufpr.api.model.response.TokenResponse;
import br.ufpr.api.service.AuthTokenService;
import br.ufpr.api.service.ClientService;
import br.ufpr.api.service.EmployeeService;
import br.ufpr.api.service.RefreshTokenService;
import br.ufpr.api.util.JwtTokenUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "auth", consumes = "application/json", produces = "application/json")
public class AuthController {
    @Autowired
    final ClientService clientService;
    @Autowired
    final EmployeeService employeeService;
    @Autowired
    final AuthTokenService authTokenService;
    @Autowired
    final RefreshTokenService refreshTokenService;
    @Autowired
    final JwtTokenUtil jwtTokenUtil;
    @Autowired
    final CustomAuthenticationProvider authenticationProvider;

    @ControllerAdvice
    public class GlobalExceptionHandler {
        //inicializa e retorna objetos do tipo BaseResponse com a mensagem de erro recebida por qualquer excessão emitida pelo controller
        @ExceptionHandler({ Exception.class })
        public ResponseEntity<BaseResponse> handleGenericException(Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponse(ex.getMessage()));
        }
        @ExceptionHandler({ BadCredentialsException.class })
        public ResponseEntity<BaseResponse> handleBadCredentialsExceptionException(BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(ex.getMessage()));
        }
        @ExceptionHandler({ UsernameNotFoundException.class })
        public ResponseEntity<BaseResponse> handleUsernameNotFoundException(UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(ex.getMessage()));
        }
    }

    @PostMapping("/registro-cliente")
    public ResponseEntity<BaseResponse> register(@RequestBody @Valid ClientRegisterDto registerDto) throws RuntimeException {
        if (clientService.existsByCpf(registerDto.getCpf()) || employeeService.existsByCpf(registerDto.getCpf())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new BaseResponse("Usuário com esse CPF já existe."));
        }
        if(clientService.existsByEmail(registerDto.getEmail()) || employeeService.existsByEmail(registerDto.getEmail())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new BaseResponse("Usuário com esse email já existe."));
        }
        try {
            Client client = storeNewClient(registerDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse(client));
        } catch (Exception e) {
            throw new RuntimeException("Erro ao registrar usuário.");
        }
    }

    //login universal, bifurca dependendo da role do usuário
    @PostMapping("/login")
    public ResponseEntity<BaseResponse> login(@RequestBody @Valid UserLoginDto userLoginDto) throws BadCredentialsException {
        try {
            var credentials = new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(),
                    userLoginDto.getPassword());
            Authentication auth = authenticationProvider.authenticate(credentials);
            var userDescription = (UserDescription) auth.getPrincipal();
            TokenResponse tokenResponse;

            if(userDescription.getUserRole() == UserRole.CLIENT) {
                Client client = clientService.findById(userDescription.getUserId()).get();
                //removendo tokens de autenticação antigos, gerando novos:
                authTokenService.deleteByUserIdAndUserRole(client.getId(), UserRole.CLIENT);
                refreshTokenService.deleteByUserIdAndUserRole(client.getId(), UserRole.CLIENT);
                tokenResponse = generateNewAccessTokenForUser(client.getId(), UserRole.CLIENT);
                var authResponse = new ClientAuthResponse(tokenResponse, client);
                return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(authResponse));
            }
            else {
                Employee employee = employeeService.findById(userDescription.getUserId()).get();
                authTokenService.deleteByUserIdAndUserRole(employee.getId(), UserRole.EMPLOYEE);
                refreshTokenService.deleteByUserIdAndUserRole(employee.getId(), UserRole.EMPLOYEE);
                tokenResponse = generateNewAccessTokenForUser(employee.getId(), UserRole.EMPLOYEE);
                var authResponse = new EmployeeAuthResponse(tokenResponse, employee);
                return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(authResponse));
            }
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Credenciais inválidas.");
        }
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<BaseResponse> refresh(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
                                          @RequestBody @Valid UserRefreshTokenDto userRefreshTokenDto) {
        var authToken = userRefreshTokenDto.getAuthToken();
        final UUID userId = UUID.fromString(jwtTokenUtil.extractSubject(authToken));
        UserRole role = jwtTokenUtil.extractClaim(authToken, "role");
        if (!jwtTokenUtil.isTokenValid(authToken, userId)) {
            authTokenService.deleteByUserIdAndUserRole(userId, role);
            refreshTokenService.deleteByUserIdAndUserRole(userId, role);
        }
        var accessToken = generateNewAccessTokenForUser(userId, role);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(accessToken));
    }

    private Client storeNewClient(ClientRegisterDto registerDto) {
        Client client = new Client();
        BeanUtils.copyProperties(registerDto, client);
        client.setPassword("1234");
        return clientService.save(client);
    }

    private TokenResponse generateNewAccessTokenForUser(UUID userId, UserRole role) {
        var auth = new AuthToken();
        Map<String, Object> claims = Map.of("role", role);
        TokenExpiration generatedAuth = jwtTokenUtil.generateToken(claims, userId);
        auth.setToken(generatedAuth.getToken());
        auth.setExpirationDate(generatedAuth.getExpiration());
        auth.setUserId(userId);
        auth.setUserRole(role);
        String newAuth = authTokenService.save(auth).getToken();
        var refresh = new RefreshToken();
        TokenExpiration generatedRefresh = jwtTokenUtil.generateRefreshToken();
        refresh.setToken(generatedRefresh.getToken());
        refresh.setExpirationDate(generatedRefresh.getExpiration());
        refresh.setUserId(userId);
        refresh.setUserRole(role);
        String newRefresh = refreshTokenService.save(refresh).getToken();
        return new TokenResponse(newAuth, newRefresh);
    }
}
