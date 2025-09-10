package br.ufpr.api.configuration;

import br.ufpr.api.model.data.UserDescription;
import br.ufpr.api.model.entity.Client;
import br.ufpr.api.model.entity.Employee;
import br.ufpr.api.service.ClientService;
import br.ufpr.api.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

//retorna token de autenticação do spring security para usuário válido ou erro para usuário inválido
@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    final ClientService clientService;
    @Autowired
    final EmployeeService employeeService;

    @Override
    public Authentication authenticate(Authentication authentication) throws UsernameNotFoundException, BadCredentialsException {
        String loginEmail = authentication.getPrincipal().toString();
        String loginPassword = authentication.getCredentials().toString();

        var optionalClient = clientService.findByEmail(loginEmail);
        var optionalEmployee = employeeService.findByEmail(loginEmail);
        var user = optionalClient.isPresent() ? optionalClient.get() : optionalEmployee.get(); //login universal

        String userPassword = optionalClient
                .map(Client::getPassword)
                .orElseGet(() -> optionalEmployee
                        .map(Employee::getPassword)
                        .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado."))
                );

        boolean isAuthenticated = loginPassword.equals(userPassword);

        if (!isAuthenticated) {
            throw new BadCredentialsException("Credenciais inválidas.");
        }
        var userDescription = new UserDescription(user.getId(), user.getRole());

        return new UsernamePasswordAuthenticationToken(userDescription, null, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}