package br.ufpr.api.model.response;

import br.ufpr.api.model.entity.Client;
import br.ufpr.api.model.entity.Employee;
import br.ufpr.api.model.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmployeeAuthResponse {
    TokenResponse accessToken;
    UserRole userRole;
    Employee employee;

    public EmployeeAuthResponse(TokenResponse accessToken, Employee employee) {
        this.accessToken = accessToken;
        this.userRole = UserRole.EMPLOYEE;
        this.employee = employee;
    }
}
