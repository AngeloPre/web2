[![Deploy Angular to GitHub Pages](https://github.com/AngeloPre/web2/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/AngeloPre/web2/actions/workflows/deploy-gh-pages.yml)

# ANGULAR 19
Baixou agora?

```bash
npm i
```

vai instalar as dependencias do projeto!

Definido no package.json já vem os scripts para rodar no npm:

```json
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
}
```

Para rodar qualquer um dos comandos use npm

```bash
npm run watch
```

Para adicionar uma nova página (sub-dominio):

```bash
npx ng g c pages/home --standalone --inline-style --skip-tests
```

g = generate

```
ng g c → component

ng g s → service

ng g d → directive

ng g p → pipe

ng g g → guard

ng g i → interceptor

ng g cl → class

ng g e → enum

ng g r → resolver
```

```
--inline-style → garante que não coloca arquivo css, como estamos usando tailwind!

--skip-tests → quem testa é o cliente!
```

Depois de adicionada coloque no arquivo app.routes.ts um registro da sua nova rota

```javascript
children: [
  { path: "subdominioquevcescolher", component: nomeComponent }, // <- essa linha aqui você adiciona na lista
];
```

Para editar o layout geral vá na página app/layouts/shell

Para editar a 404 vá em app/pages/errors/not-found

Crie novas pages em app/pages/nome usando o comando.

Adicionei ao tsconfig.json:

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
        "@/*": ["src/*"],
        "@core/*": ["src/app/core/*"],
        "@shared/*": ["src/app/shared/*"]
    }
}
```

Vantagem:

A pasta src está referenciada pelo @, não é necessário voltar pra ela com ../

```javascript
// antes
import { ApiClient } from "../../../core/http/api-client";

// depois
import { ApiClient } from "@/core/http/api-client";
```
