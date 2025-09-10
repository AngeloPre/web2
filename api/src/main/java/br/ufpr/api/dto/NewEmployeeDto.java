package br.ufpr.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class NewEmployeeDto {
    @NotBlank
    String cpf;
    @NotBlank
    String name;
    @NotBlank
    String email;
    @NotNull
    Date birthday;
    @NotBlank
    String password;
}
