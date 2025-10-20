package br.ufpr.api.model.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import br.ufpr.api.model.enums.StatusConserto;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_chamado")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Chamado {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "cliente_id", nullable = false)
  private Cliente cliente;

  @ManyToOne(fetch = FetchType.LAZY, optional = true)
  @JoinColumn(name = "funcionario_id", nullable = true)
  private Funcionario funcionario;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "categoria_id", nullable = false)
  private CategoriaEquipamento categoriaEquipamento;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, length = 30)
  private StatusConserto status;

  @Column(name = "descricao_equipamento", columnDefinition = "TEXT", nullable = false)
  private String descricaoEquipamento;

  @Column(name = "descricao_falha", columnDefinition = "TEXT", nullable = false)
  private String descricaoFalha;

  @Column(name = "slug", nullable = false, length = 120, unique = true)
  private String slug;

  @CreationTimestamp
  @Column(name = "data_criacao", nullable = false, updatable = false)
  private Instant dataCriacao;

  @Column(name = "data_resposta")
  private Instant dataResposta;

  @Column(name = "comentario", columnDefinition = "TEXT")
  private String comentario;

  @Column(name = "preco_base", nullable = false, precision = 12, scale = 2)
  private BigDecimal precoBase;

  @OneToMany(mappedBy = "chamado",
      cascade = CascadeType.ALL, //esse cara derruba todas as associações que ficarem orfãs
      orphanRemoval = true )
  @OrderBy("criadoEm ASC")
  private List<EtapaHistorico> etapas = new ArrayList<>();
}
