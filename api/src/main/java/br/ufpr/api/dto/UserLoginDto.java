package br.ufpr.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserLoginDto {
    @NotBlank
    public String email;
    @NotBlank
    @Size(min = 4, max = 4)
    public String password;
}
