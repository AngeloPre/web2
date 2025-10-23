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

## GlobalExceptionHandler
- Criado o GlobalExceptionHandler para gerenciar os erros de maneira geral.
como funciona: ele fica "escutando" o que acontece nos controllers.
quando o service é chamado e lança uma exception, essa classe intercepta a exceção e procura o metodo que foi definido na classe para lidar com a exceção correspondente, retornando um código adequado.

exemplo: estourou um EntityNotFoundException no controller de funcionario ao tentar buscar um id especifico, a classe possui o metodo handleEntityNotFound para lidar com essa exceção, retornando o codigo 404 (NOT_FOUND) para todos os casos desse tipo

**inserir mais métodos conforme a necessidade**

