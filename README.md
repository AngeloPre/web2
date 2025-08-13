<p align="center">
  <img alt="projeto web2" src=".github/maintenance.png" width="80%">
</p>

## Frontend



## Backend

Para compilar o backend use o comando:

```bash
./mvnw clean compile
```
Para executar o backend use o comando:

```bash
./mvnw spring-boot:run
```
Para executar todos os testes use o comando:

```bash
./mvnw -q test
```
- flag "-q" reduz o detalhamento dos testes

## Postgres + Pgadmin
O docker compose já está configurado para subir o banco + pgadmin. Rode o comando:

```bash
docker compose up -d
```

Entre no link a seguir para abrir o postgres admin e acessar o banco de dados

Abra o Pgadmin: [Clique aqui](http://localhost:5050/login)

Ou copie:
```
http://localhost:5050/login
```
- Login: admin@admin.com
- Senha: admin

## Swagger
Entre no link a seguir para abrir o swagger e testar os endpoints

Abra o Swagger UI: [Clique aqui](http://localhost:8080/swagger-ui/index.html)

Ou copie:
```
http://localhost:8080/swagger-ui/index.html
```

- Login: admin
- Senha: admin