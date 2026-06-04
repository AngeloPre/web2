<p align="center">
  <img alt="projeto web2" src=".github/maintenance.png" width="80%">
</p>

<h1 align="center">Web2</h1>

<p align="center">
  Aplicação full-stack com Angular, Spring Boot e PostgreSQL
</p>

<div align="center">

[![Deploy Angular to GitHub Pages](https://github.com/AngeloPre/web2/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/AngeloPre/web2/actions/workflows/deploy-gh-pages.yml)
[![Build and Deploy Backend](https://github.com/AngeloPre/web2/actions/workflows/backend_deploy.yml/badge.svg)](https://github.com/AngeloPre/web2/actions/workflows/backend_deploy.yml)

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css&logoColor=white)

</div>

---

## 📑 Índice

- [🖥️ Frontend](#️-frontend)
- [⚙️ Backend](#️-backend)
- [🐘 Postgres + PgAdmin](#-postgres--pgadmin)
- [📄 Swagger](#-swagger)

---

## 🖥️ Frontend

Acesse o diretório do frontend:

```bash
cd web/
```

Instale as dependências:

```bash
npm install
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila o projeto para produção |
| `npm run watch` | Compila em modo watch (desenvolvimento) |
| `npm run test` | Executa os testes unitários |

### 📚 Links úteis — Frontend

| Recurso | Link |
|---|---|
| 🎨 Figma | [Documentação do Figma](https://github.com/AngeloPre/web2/blob/main/web/src/app/pages/figma.md) |
| 🏠 Landing Page | [Documentação da Landing Page](https://github.com/AngeloPre/web2/blob/main/web/Landing-Page.md) |
| 🧩 Padrão de Projeto | [Documentação de Componentes](https://github.com/AngeloPre/web2/blob/main/web/Components.md) |
| 💨 Tailwind & CSS | [Documentação Tailwind](https://github.com/AngeloPre/web2/blob/main/web/Tailwind.md) |
| 🚫 Página 404 | [Referência de Design 404](https://github.com/AngeloPre/web2/blob/main/web/src/app/pages/404.md) |
| ⏳ Loading (Rive) | [Implementação de loading](https://rive.app/docs/runtimes/web/rive-parameters) |
| 🗂️ NgRx + Signals | [Gerenciamento de Estado](https://angular.love/mastering-state-management-in-angular-with-ngrx-and-signals-scalable-predictable-performant) |
| 🔤 Base64 para jsPDF | [Encoder de fontes](https://www.giftofspeed.com/base64-encoder/) |

---

## ⚙️ Backend

Acesse o diretório do backend:

```bash
cd api/
```

Compile o projeto:

```bash
./mvnw clean compile
```

Execute o servidor:

```bash
./mvnw spring-boot:run
```

Execute os testes:

```bash
./mvnw -q test
```

> 💡 A flag `-q` reduz o detalhamento da saída dos testes.

---

## 🐘 Postgres + PgAdmin

O `docker-compose.yml` já está configurado para subir o banco de dados e o PgAdmin. Execute:

```bash
docker compose up -d
```

Acesse o PgAdmin em: **[http://localhost:5050/login](http://localhost:5050/login)**

| Campo | Valor |
|---|---|
| Login | `admin@admin.com` |
| Senha | `admin` |

---

## 📄 Swagger

Acesse a documentação interativa da API:

- **Local:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **Remoto:** [https://java-web2.tail041186.ts.net/swagger-ui/index.html](https://java-web2.tail041186.ts.net/swagger-ui/index.html)
