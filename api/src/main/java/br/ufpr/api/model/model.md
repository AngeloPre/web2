# model

**importante**
 - Qualquer modelagem relacionada a dinheiro vamos armazenar em centavos, em um Long/BIGINT
 - Para melhorar a precisão dos dados usamos BigDecimal para os calculos
 - Da pra otimizar @ManyToOne com fetch lazy para não fazer requisições desnecessárias quando existe join
 ```
 @ManyToOne(fetch = FetchType.LAZY, optional = false)
 ```

**O que vai aqui?**
- Entidades JPA que mapeiam tabelas do banco.

Comece declarando como entidade, o nome da tabela, e a classe a ser mapeada
```
@Entity
@Table(name = "tbl_user")
public class User {
```

Dentro da classe, declare as propriedades das colunas, qual coluna se refere no banco, e os atributos da classe:
```
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "user_id")
private Integer id;
```

Por fim adicione os getters e setters...
- No vscode com a extensão java instalada clique com o direito e clique em Source action
- Isso irá abrir um menu, clique na opção Generate getters and setters!
- Caso queira fazer manualmente, segue template:
```
public Integer getId() {
    return id;
}
public void setId(Integer id) {
    this.id = id;
}
```

Evitamos que null seja colocado em campos que precisam de dados obrigatóriamente
```
@Column(name = "price", nullable = false)
```

