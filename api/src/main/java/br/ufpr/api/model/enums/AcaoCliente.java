package br.ufpr.api.model.enums;

public enum AcaoCliente {
    APROVAR("Aprovar"),
    REJEITAR("Rejeitar"),
    RESGATAR("Resgatar"),
    PAGAR("Pagar");

    private final String descricao;
    AcaoCliente(String descricao) { this.descricao = descricao; }
    public String getdescricao() { return descricao; }

    public static AcaoCliente fromdescricao(String descricao) {
        for (var v : values()) if (v.descricao.equalsIgnoreCase(descricao)) return v;
        throw new IllegalArgumentException("Ação inválida: " + descricao);
    }

}
