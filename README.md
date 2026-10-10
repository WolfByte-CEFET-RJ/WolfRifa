# 🐺 WolfRifa

> Plataforma social desenvolvida para facilitar a criação, gestão e divulgação de campanhas de arrecadação financeira, como **rifas solidárias** e **vaquinhas online (crowdfunding)**.

Projeto desenvolvido no âmbito da **WolfByte - CEFET-RJ**.

---

## 📌 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Configuração do Backend](#-configuração-do-backend)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Opção 1: Executando com Docker Compose (Recomendado)](#opção-1-executando-com-docker-compose-recomendado)
  - [Opção 2: Executando Localmente (Postgres no Docker)](#opção-2-executando-localmente-postgres-no-docker)
  - [Migrations (Migrações do Banco)](#migrations-migrações-do-banco)
  - [Seeds (Dados Iniciais / Testes)](#seeds-dados-iniciais--testes)
  - [Gerenciamento do Banco via Adminer](#gerenciamento-do-banco-via-adminer)
- [Configuração do Frontend](#-configuração-do-frontend)
  - [Instalação e Execução](#instalação-e-execução)
  - [Scripts Disponíveis](#scripts-disponíveis-frontend)
- [Resumo dos Scripts](#-resumo-dos-scripts)
- [Rotas da API](#-rotas-da-api)
- [Dúvidas Frequentes e Dicas](#-dúvidas-frequentes-e-dicas)

---

## 🚀 Tecnologias

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (v20+)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Framework Web:** [Express 5](https://expressjs.com/)
- **Query Builder & Migrations:** [Knex.js](https://knexjs.org/)
- **Banco de Dados:** [PostgreSQL 16](https://www.postgresql.org/)
- **Validação de Schemas:** [Yup](https://github.com/jquense/yup)
- **Autenticação:** [JWT (JSON Web Token)](https://jwt.io/) & [Bcrypt](https://www.npmjs.com/package/bcrypt)
- **Execução TS:** [tsx](https://github.com/privatenumber/tsx)

### Frontend
- **Biblioteca:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server:** [Vite](https://vitejs.dev/)
- **Linter:** [ESLint](https://eslint.org/)

### Infraestrutura & DevOps
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Adminer](https://www.adminer.org/) (Interface Web para gerenciamento do banco)

---

## 📂 Estrutura do Projeto

```text
WolfRifa/
├── back/                      # Código-fonte da API Backend
│   ├── docker-compose.yml     # Orquestração do Postgres, Back e Adminer
│   ├── dockerfile             # Imagem Docker do Backend
│   ├── knexfile.ts            # Configuração do Knex (conexão, migrations, seeds)
│   ├── package.json           # Dependências e scripts do Backend
│   ├── .env.example           # Modelo de variáveis de ambiente do Backend
│   └── src/
│       ├── controllers/       # Controladores das rotas
│       ├── database/
│       │   ├── config/        # Configuração de conexão com BD
│       │   ├── connection/    # Instância singleton do Knex
│       │   ├── migrations/    # Scripts de criação e alteração de tabelas
│       │   └── seeds/         # Scripts de povoamento inicial do banco
│       ├── middleware/        # Middlewares de autenticação e validação
│       ├── routes/            # Definição das rotas da API
│       ├── services/          # Regras de negócio
│       ├── yup/               # Schemas de validação de dados
│       └── server.ts          # Ponto de entrada da aplicação
│
├── front/                     # Código-fonte da aplicação Frontend
│   ├── package.json           # Dependências e scripts do Frontend
│   ├── vite.config.ts         # Configuração do Vite
│   └── src/                   # Componentes, estilos e páginas React
│
└── README.md                  # Documentação geral do projeto
```

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (recomendado versão 20.x ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado junto ao Node.js)
- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)

---

## ⚙️ Configuração do Backend

Navegue até o diretório `back`:

```bash
cd back
```

### Variáveis de Ambiente

Crie o arquivo `.env` na raiz do diretório `back` com base no arquivo `.env.example`:

```bash
cp .env.example .env
```

Configuração padrão recomendada para desenvolvimento:

```env
PORT=3000
HOST=0.0.0.0

NODE_ENV=development

# Conexão com o banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=wolfrifa
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/wolfrifa

# Autenticação JWT
JWT_EXPIRES_IN=7d
JWT_SECRET=sua_chave_secreta_jwt_para_desenvolvimento
```

> **Nota sobre `DB_HOST`:**
> - Se você estiver rodando o servidor diretamente na sua máquina local (fora do Docker) conectando ao Postgres do Docker, use `DB_HOST=localhost`.
> - Se você estiver rodando o backend dentro do container do Docker Compose, a própria rede Docker usa o hostname `postgres` (já configurado automaticamente no `docker-compose.yml`).

---

### Opção 1: Executando com Docker Compose (Recomendado)

O arquivo `docker-compose.yml` já configura os serviços de **PostgreSQL**, **Backend** e **Adminer**.

1. **Subir os containers:**

   ```bash
   docker compose up -d
   ```

2. **Verificar os logs dos serviços:**

   ```bash
   docker compose logs -f
   ```

3. **Executar as migrations e seeds dentro do container:**

   ```bash
   # Executar as migrações do banco
   docker compose exec server npm run migrate:latest

   # Popular o banco com dados de teste (seeds)
   docker compose exec server npm run seed:run
   ```

4. **Parar os containers:**

   ```bash
   docker compose down
   ```

---

### Opção 2: Executando Localmente (Postgres no Docker)

Se preferir rodar o servidor Node.js no host para desenvolvimento com hot-reload rápido:

1. **Subir apenas o container do banco de dados:**

   ```bash
   docker compose up -d postgres
   ```
   *(Opcional: adicione `adminer` se desejar a interface visual: `docker compose up -d postgres adminer`)*

2. **Instalar as dependências do projeto:**

   ```bash
   npm install
   ```

3. **Executar as migrations:**

   ```bash
   npm run migrate:latest
   ```

4. **Executar as seeds:**

   ```bash
   npm run seed:run
   ```

5. **Iniciar o servidor em modo de desenvolvimento:**

   ```bash
   npm run dev
   ```

O servidor estará disponível em: **`http://localhost:3000`**

---

### 🗄️ Migrations (Migrações do Banco)

O Knex gerencia o versionamento do banco de dados. Os arquivos de migração ficam em `back/src/database/migrations/`.

| Comando | Descrição |
| --- | --- |
| `npm run migrate:latest` | Executa todas as migrações pendentes |
| `npm run migrate:rollback` | Reverte a última migração aplicada |
| `npm run migrate:make <nome>` | Cria um novo arquivo de migração |

**Exemplo de criação de migração:**

```bash
npm run migrate:make criar_tabela_exemplo
```

---

### 🌱 Seeds (Dados Iniciais / Testes)

Os seeds povoam o banco com dados fictícios para facilitar o desenvolvimento. Ficam localizados em `back/src/database/seeds/`.

| Comando | Descrição |
| --- | --- |
| `npm run seed:run` | Executa todos os seeds em ordem |
| `npm run seed:make <nome>` | Cria um novo arquivo de seed |

#### Dados criados pelos seeds:
- **Usuários de teste:**
  - `ana.souza@example.com` (Telefone: `5511999990001`)
  - `bruno.lima@example.com` (Telefone: `5511999990002`)
  - `carla.mendes@example.com` (Telefone: `5511999990003`)
- **Campanhas de teste:**
  - Campanha tipo vaquinha (crowdfunding): *Ajude a construir a biblioteca comunitária*
  - Campanha tipo rifa: *Rifa solidária para tratamento veterinário*
- Redes sociais, inscrições e comprovantes associados para testes de fluxo completo.

---

### 🖥️ Gerenciamento do Banco via Adminer

Para visualizar as tabelas e dados através de uma interface web:

1. Acesse: **`http://localhost:8080`**
2. Preencha os campos com as credenciais do seu `.env`:
   - **Sistema:** `PostgreSQL`
   - **Servidor:** `postgres` *(ou `localhost:5432` se acessando fora da rede do docker-compose)*
   - **Usuário:** `postgres`
   - **Senha:** `postgres`
   - **Base de dados:** `wolfrifa`

---

## 🎨 Configuração do Frontend

Navegue até o diretório `front`:

```bash
cd front
```

### Instalação e Execução

1. **Instalar as dependências:**

   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

3. Abra o navegador no endereço indicado no terminal (normalmente **`http://localhost:5173`**).

### Scripts Disponíveis (Frontend)

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o Vite em modo desenvolvimento com Hot Module Replacement (HMR) |
| `npm run build` | Valida tipagens com TypeScript (`tsc -b`) e compila para produção na pasta `dist/` |
| `npm run preview` | Executa localmente o bundle gerado na pasta `dist/` para testes |
| `npm run lint` | Executa o ESLint para validação de boas práticas e regras de código |

---

## 📜 Resumo dos Scripts

### Backend (`/back`)
```bash
npm run dev               # Inicia o servidor com tsx em modo watch
npm run migrate:latest    # Roda as migrações pendentes no PostgreSQL
npm run migrate:rollback  # Desfaz a última migração executada
npm run migrate:make <nm> # Cria um novo arquivo de migração TypeScript
npm run seed:run          # Executa todos os seeds de dados no banco
npm run seed:make <nome>  # Cria um novo arquivo de seed TypeScript
```

### Frontend (`/front`)
```bash
npm run dev       # Inicia o Vite dev server
npm run build     # Compila a aplicação para produção
npm run preview   # Visualiza o build de produção localmente
npm run lint      # Roda verificação do linter ESLint
```

---

## 🔌 Rotas da API

Principais rotas disponíveis na versão atual:

| Método | Endpoint | Protegido | Descrição |
| --- | --- | :---: | --- |
| `GET` | `/` | Não | Retorna mensagem de status/boas-vindas (`Hello World!`) |
| `POST` | `/auth/login` | Não | Realiza o login (via e-mail ou telefone) e retorna o token JWT |
| `POST` | `/api/auth/user/register` | Não | Cadastra um novo usuário na plataforma |
| `POST` | `/campaign/vaquinha` | **Sim (JWT)** | Cria uma nova vaquinha (campanha + crowdfunding) conforme documentação oficial |
| `GET` | `/campaign/vaquinha` | Não | Lista todas as vaquinhas ativas cadastradas |

---

## 💡 Dúvidas Frequentes e Dicas

### 1. Erro de conexão `ECONNREFUSED 127.0.0.1:5432`
- Verifique se o container do PostgreSQL está em execução:
  ```bash
  docker ps
  ```
- Caso não esteja, suba o banco com:
  ```bash
  cd back && docker compose up -d postgres
  ```

### 2. Porta 5432 ou 3000 já em uso
- Se você já possui uma instância local do PostgreSQL rodando na porta 5432, altere a porta externa mapeada no `docker-compose.yml` (ex: `"5433:5432"`) e atualize o `DB_PORT` no `.env`.

### 3. Como limpar completamente o banco de dados do Docker
- Se desejar resetar o banco de dados e os volumes persistidos:
  ```bash
  cd back
  docker compose down -v
  docker compose up -d postgres
  npm run migrate:latest
  npm run seed:run
  ```

---

<p align="center">
  Desenvolvido com 💙 pela equipe <b>WolfByte - CEFET-RJ</b>.
</p>
