# exception

**O que vai aqui?**
- exceções de **negócio** (`RuntimeException` custom).

**boas práticas**
- crie exceções específicas: `RecursoNaoEncontradoException`, `FluxoInvalidoException`.

**O que são e como criar?**
- Estenda RuntimeException com extend dessa forma:

```
public class SolicitacaoNotFoundException extends RuntimeException {
    public SolicitacaoNotFoundException(String msg) {
        super(msg); 
    }
}
```

Essas são excessões não-checadas (unchecked) o compilador não obriga try/catch nem throws.

Onde lançar: na camada de service quando uma regra falha (ex.: recurso não existe, fluxo inválido, conflito).

**O que o super(msg) faz?**

- Chama o construtor da classe-mãe (RuntimeException(String message)), guardando o texto em getMessage().