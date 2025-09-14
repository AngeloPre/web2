package br.ufpr.api.configuration;

import br.ufpr.api.model.entity.Client;
import br.ufpr.api.model.entity.Employee;
import br.ufpr.api.service.ClientService;
import br.ufpr.api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

//inicializa as tabelas com dados
//se tivermos script de inserção de dados não precisamos apagar esse arquivo pois ele só popula as tabelas se estiverem vazias
@Component
public class DataLoader implements CommandLineRunner {
    @Autowired private EmployeeService employeeService;
    @Autowired private ClientService clientService;

    @Override
    public void run(String... args) throws Exception {
        if(employeeService.findAll().isEmpty()) {
            Employee funcionario = new Employee();
            funcionario.setName("Funcionario da Silva");
            funcionario.setCpf("53389748008");
            funcionario.setEmail("funcionario@funcionario.com");
            funcionario.setPassword("1234");
            funcionario.setBirthday(new Date());
            employeeService.save(funcionario);
        }

        if(clientService.findAll().isEmpty()) {
            var cliente = new Client();
            cliente.setEmail("cliente@cliente.com");
            cliente.setName("Cliente da Silva");
            cliente.setCpf("784.606.480-01");
            cliente.setPhone("41999999999");
            cliente.setPassword("1234");
            clientService.save(cliente);
        }
    }
}