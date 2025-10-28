package br.ufpr.api.model.entity;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import br.ufpr.api.model.enums.StatusConserto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_chamado_etapa")
@Getter
@Setter
@AllArgsConstructor
public class EtapaHistorico {

    public EtapaHistorico () {

    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "chamado_id", nullable = false)
    private Chamado chamado;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private StatusConserto status;

    @Column(name = "comentario", columnDefinition = "TEXT")
    private String comentario;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private Instant dataCriacao;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "orcamento_id", nullable = false)
    private Orcamento orcamento;

    @Column(name = "motivo_rejeicao", columnDefinition = "TEXT")
    private String motivoRejeicao;
}
