package br.ufpr.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ClientRegisterDto {
    @NotBlank
    @Size(max = 11) //apenas numeros
    private String cpf;
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
}