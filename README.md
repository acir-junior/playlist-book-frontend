# Documentação do Projeto Frontend (Playlist books)

## Estrutura do Projeto

```
├── components.json
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── jest.config.ts
├── next.config.ts
├── next-env.d.ts
├── node_modules
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   ├── app
│   │   ├── components
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── models
│   │   └── page.tsx
│   ├── components
│   │   └── ui
│   ├── core
│   │   ├── factories
│   │   └── infra
│   ├── lib
│   │   └── utils.ts
│   └── providers
│       └── react-query-provider.tsx
├── tailwind.config.ts
└── tsconfig.json
```

## Descrição

Este é um projeto frontend desenvolvido com **Next.js**, utilizando conceitos de **Clean Architecture** e **SOLID** para manter um código modular e reutilizável.

### Principais Tecnologias e Ferramentas:

- **Next.js** - Framework para React.
- **React Query** - Gerenciamento de estado assíncrono e requisições HTTP.
- **Zod** - Validação de esquemas e formulários.
- **Tailwind CSS** - Estilização rápida e eficiente.
- **Jest** - Testes unitários.
- **ESLint e Prettier** - Padronização de código.
- **Docker** - Containeração para desenvolvimento e produção.

## Estrutura das Pastas

### `src/core`

Contém a regra de negócio da aplicação de forma desacoplada do framework. Aqui estão as camadas:

- **factories/** - Responsável por criação de instâncias e injeção de dependência.
- **infra/** - Implementações concretas de serviços, como requisições HTTP, persistência de dados, etc.

### `src/components`

Contém os componentes reutilizáveis da aplicação.

- **ui/** - Componentes de interface reutilizáveis.

### `src/lib`

Bibliotecas auxiliares e funções útis.

### `src/providers`

Providers de contexto para gerenciamento de estados globais.

- **react-query-provider.tsx** - Configuração do React Query.

### `public/`

Arquivos estáticos, como imagens e ícones.

## Configuração e Execução do Projeto

### Clonar o Repositório

```sh
git clone <repo-url>
cd nome-do-projeto
```

### Instalar Dependências

```sh
npm install
# ou
yarn install
```

### Rodar o Servidor de Desenvolvimento

```sh
npm run dev
# ou
yarn dev
```

### Build para Produção

```sh
docker-compose (docker compose) up -d --build
```

## Notas Adicionais

- As requisições para o backend podem ser feitas via **fetch** ou **axios**, bastando alterar a injeção de dependência na camada **infra**.
- A documentação das APIs está integrada ao backend utilizando **Swagger**.

---

Esse README pode ser atualizado conforme necessário. Caso precise de mais informações, me avise! 🚀

