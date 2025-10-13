package br.ufpr.api.model.enums;

public enum StatusConserto {
    ABERTA("Aberta"),
    ORCADA("Orçada"),
    REJEITADA("Rejeitada"),
    APROVADA("Aprovada"),
    REDIRECIONADA("Redirecionada"),
    ARRUMADA("Arrumada"),
    PAGA("Paga"),
    FINALIZADA("Finalizada");

    private final String descricao;

    StatusConserto(String descricao) { this.descricao = descricao; }
    public String getdescricao() { return descricao; }

    public static StatusConserto fromdescricao(String descricao) {
        for (var v : values()) {
            if (v.descricao.equalsIgnoreCase(descricao)) return v;
        }
        throw new IllegalArgumentException("Status inválido: " + descricao);
    }
}
