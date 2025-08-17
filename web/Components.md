## Importante! recomendo a criação dos components com o seguinte comando:

```bash
npx ng g c shared/components/nome-do-template --standalone --inline-style --skip-tests --export
```
Isso já exporta o componente para ser usado, e cria apenas um .ts com tudo centralizado

## Explicação da técnica:

Seguiremos a estrutura abaixo para criar os elementos de forma organizada:

```bash
shared/
  components/
    seu-componente-aqui/
```
Siga o figma: [Disponível aqui](https://www.figma.com/design/l2FOk4gyBZ939U3bBxKoRu/WEB2)

Importe seu componente dentro da page, e a page dentro do router, como child do Layout correto. Acessar a subrota definida para a page te dará acesso a um desenvolvimento "ao vivo" de todas as mudanças que fizer nos componentes.