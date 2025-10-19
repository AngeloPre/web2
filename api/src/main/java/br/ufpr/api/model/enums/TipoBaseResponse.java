package br.ufpr.api.model.enums;

public enum TipoBaseResponse {
    VAZIO("VAZIO"),
    ERRO("ERRO"),
    DADOS("DADOS");

    private String value;

    TipoBaseResponse(String value) {
        this.value = value;
    }

    String getTipoBaseResponse() {
        return this.value;
    }
}

