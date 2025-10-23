package br.ufpr.api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.ufpr.api.service.SeedService;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	//bean para rodar o seed service na inicialização
	@Bean
    CommandLineRunner run(SeedService seedService) {
        return args -> {
            System.out.println("Executando SeedService");
        
            seedService.createDefaultFuncionarios(); 
            
            seedService.createDefaultClientes(); 
            
            System.out.println("Banco de dados populado com sucesso!!!");
        };
    }

}
