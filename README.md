# Sistema de Gestão de Inventário

Aplicação desenvolvida com TypeScript para gestão de um inventário de produtos. Permitindo listar, criar, editar e excluir itens.

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos
- Busca de produtos
- Validação de dados
- Testes automatizados da API

## Tecnologias utilizadas

**Backend:**
- PostgreSQL
- Node.js 
- TypeScript
- Prisma
- Express
- Zod
- Jest
- Supertest

**Frontend:**
- TypeScript
- React
- Vite
- CSS

## Decisões técnicas

Algumas tecnologias, como Node.js, React, TypeScript e PostgreSQL, já estavam definidas nos requisitos do desafio.

As demais escolhas foram feitas considerando produtividade, organização do código, integração com TypeScript e facilidade de manutenção.

### Prisma

Prisma foi escolhido como ORM por possuir uma sintaxe simples, boa integração com TypeScript e facilitar operações no banco de dados de forma mais segura e produtiva.

Além disso, o Prisma possui tipagem automática e sistema de migrations que ajudam na organização do banco.

### Express

Express foi utilizado na criação da API REST por ser leve, simples de configurar e bastante utilizado no ecossistema Node.js.

### Zod

Zod foi utilizado para validação dos dados recebidos pela API, garantindo que apenas informações válidas sejam processadas pela aplicação.

A integração com TypeScript também ajuda a manter consistência entre validação e tipagem.

### Vite

Vite foi utilizado no frontend por oferecer um ambiente de desenvolvimento rápido e configuração simples para projetos React com TypeScript.

### CSS Modules

CSS foi utilizado para manter os estilos organizados e isolados por componente, evitando conflitos de classes e facilitando a manutenção da interface.

A escolha também levou em consideração familiaridade prévia com a tecnologia.

### Jest e Supertest

Jest e Supertest foram utilizados para implementar testes automatizados da API.

O Jest foi utilizado como framework de testes por possuir configuração simples e ampla utilização no ecossistema JavaScript/TypeScript.

O Supertest foi utilizado para realizar requisições HTTP nas rotas da aplicação durante os testes, permitindo validar respostas, códigos de status e comportamento da API.

## Estrutura do projeto

```text
inventory-management/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ProductForm.tsx
│   │   │   └── ProductList.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── app.ts
│   ├── index.ts
│   └── tests/
│       └── products.test.ts
│
├── jest.config.ts
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

### Organização do projeto

- `frontend/`: interface da aplicação desenvolvida com React e TypeScript.
- `pages/`: páginas principais da aplicação.
- `ProductList.tsx`: responsável pela listagem dos produtos.
- `ProductForm.tsx`: formulário de criação e edição de produtos.
- `prisma/`: configuração e modelagem do banco de dados.
- `src/`: backend da aplicação e inicialização da API.
- `jest.config.ts`: configuração do ambiente de testes com Jest.

## Como executar o projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- Node.js
- PostgreSQL
- Git

### Clone o repositório

```bash
git clone https://github.com/GeovannaMenezess/inventory-management.git
```
---
### Acesse a pasta do backend

```bash
cd inventory-management
```
---
### Instale as dependências
```bash
npm install
```
---
### Configure o banco de dados

Crie um arquivo `.env` na raiz do projeto e configure a variável:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/inventory?schema=public"
```
---
### Execute as migrations do Prisma

```bash
npx prisma migrate dev
```
---
### Inicie o backend

```bash
npx ts-node src/index.ts
```
---
### Inicie o frontend

Abra outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:

```text
Frontend: http://localhost:5173
Backend: http://localhost:3000
```

## Executando os testes

No terminal do backend, execute:

```bash
npm test