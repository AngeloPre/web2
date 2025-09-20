package br.ufpr.api.model.entity;

import br.ufpr.api.model.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "tbl_funcionario")
public class Employee extends User {
    @Column(nullable = false)
    private Date birthday;

    public Employee() {
        this.setRole(UserRole.EMPLOYEE);
    }
}
