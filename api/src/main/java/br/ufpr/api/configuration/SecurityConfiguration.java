package br.ufpr.api.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
@EnableWebSecurity
@EnableJpaRepositories("br.ufpr.api.repository")
public class SecurityConfiguration {
    @Autowired
    final JwtAuthenticationFilter jwtAuthFilter;
    @Autowired
    final CustomLogoutHandler logoutHandler;
    @Bean
    @CrossOrigin(origins = "http://localhost:4200")
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) //desabilitando csrf para evitar que recuse reqs do front no localhost
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/auth/**").permitAll() //permitir reqs sem autenticação apenas no controller de auth
                        .anyRequest().authenticated()) //demais rotas exigem que o usuário esteja autenticado
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) //filtro custom para verificar se o jwt é válido
                .logout(logout -> logout //rota custom para logout (remove os auth/refresh tokens armazenados)
                        .logoutUrl("/auth/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)))
                .build();
    }
}
