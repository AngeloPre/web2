package br.ufpr.api.model.enums;

public enum RoleUsuario {
    CLIENTE("CLIENTE"),
    FUNCIONARIO("FUNCIONARIO");

    private String value;

    RoleUsuario(String value) {
        this.value = value;
    }
}