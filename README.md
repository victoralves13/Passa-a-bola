# ⚽ Passa a Bola - Plataforma de Futebol Feminino

Uma plataforma completa para acompanhar futebol feminino, com tabelas, jogos, notícias e sistema de Fantasy.

> **📚 Este projeto faz parte do Challenge da FIAP para a empresa Passa a Bola**

## 🎯 Sobre o Projeto

🔗 Deploy: [`https://passa-a-bola-project.vercel.app/`](https://passa-a-bola-project.vercel.app/)

**Passa a Bola** é uma plataforma web moderna desenvolvida para acompanhar o futebol feminino brasileiro e internacional. O projeto foi desenvolvido como parte do Challenge da FIAP em parceria com a empresa Passa a Bola.

O projeto inclui:

- 📊 **Tabelas de Classificação** - Acompanhe a posição dos times
- 🎮 **Jogos ao Vivo** - Visualize partidas e resultados
- 📰 **Notícias** - Notícias estáticas sobre futebol feminino
- 🏆 **Fantasy League** - Sistema de apostas e rankings
- 🔐 **Autenticação** - Sistema completo com tokens e validação

## 🚀 Tecnologias

### Frontend

- **React 18.2** - Biblioteca JavaScript
- **Vite 5.4** - Build tool e dev server
- **React Router 6.14** - Roteamento
- **Tailwind CSS 3.4** - Estilização
- **Recharts 2.15** - Gráficos e visualizações
- **Context API** - Gerenciamento de estado

### Backend

- **Node.js 18+** - Runtime JavaScript
- **Express 5.1** - Framework web para Node.js
- **JSON File System** - Banco de dados
- **Bcrypt** - Hash de senhas
- **Helmet** - Segurança de headers HTTP
- **CORS** - Controle de origens permitidas
- **Express Rate Limit** - Proteção contra força bruta

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/victoralves13/Passa-a-bola.git
cd Passa-a-bola
```

### 2. Instale as dependências

```bash
npm run install:all
```

Este comando instala as dependências do projeto raiz, frontend e servidor.

### 3. Configure o banco de dados

```bash
npm run seed
```

Isso cria o arquivo `server/db/db.json` com os dados iniciais.

### 4. Inicie o projeto

```bash
npm run dev
```

Isso inicia:

- **Backend** na porta `3001`
- **Frontend** na porta `5173`

Acesse:

http://localhost:5173

## 🔑 Credenciais de Acesso

### Administrador

- **Email:** `admin@passabola.com`
- **Senha:** `123456`
- **Role:** admin

### Usuário Comum

- **Email:** `user@passabola.com`
- **Senha:** `123456`
- **Role:** user

> ⚠️ **Nota:** Em produção, as senhas são protegidas com hash bcrypt.

## 📁 Estrutura do Projeto

O projeto está dividido principalmente em duas partes:

### Frontend

Responsável pela interface da aplicação, páginas, componentes, autenticação, Fantasy, jogos, notícias e tabelas.

### Backend

Responsável pela API, autenticação, banco de dados JSON e rotas de notícias.

## 🌐 API Endpoints

### Autenticação

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verificar token

### Dados

- `GET /api/games` - Lista de jogos
- `GET /api/teams` - Lista de times
- `GET /api/ranking` - Tabela de classificação
- `GET /api/news/feminine-football` - Notícias estáticas

## 🧪 Desenvolvimento

### Deploy

- **Frontend (Vercel):** https://passa-a-bola-project.vercel.app/

### Scripts Disponíveis

```bash
# Instalar todas as dependências
npm run install:all

# Rodar em desenvolvimento (frontend + backend)
npm run dev

# Rodar apenas backend
npm run server

# Rodar apenas frontend
npm run client

# Gerar dados iniciais
npm run seed
```

### Build para Produção

```bash
cd frontend
npm run build
```

## 🔒 Segurança e Autenticação

O sistema implementa mecanismos de segurança para autenticação e proteção da API.

### Autenticação

- Validação de credenciais no servidor
- Senhas protegidas com **Bcrypt**
- Tokens únicos e seguros
- Validação de token
- Expiração automática de sessão
- Logout com remoção da sessão

### Proteções Implementadas

- **Helmet** - Headers HTTP de segurança
- **Rate Limiting** - Limitação de tentativas de login
- **CORS** - Controle de origens autorizadas
- **Bcrypt** - Senhas armazenadas utilizando hash

## 📊 Banco de Dados

O projeto utiliza um **JSON File System** como banco de dados:

`server/db/db.json`

Ele armazena informações utilizadas pela aplicação, como:

- Usuários
- Jogos
- Times
- Ranking
- Sessões

A escolha de um banco em JSON facilita a configuração e execução do projeto durante o desenvolvimento e demonstração.

## 📰 Notícias

As notícias são estáticas e gerenciadas pelo backend.

Elas ficam disponíveis através da rota:

```text
/api/news/feminine-football
```

## 🐛 Troubleshooting

### Erro ao iniciar

- Verifique se o Node.js 18+ está instalado
- Execute `npm run install:all` novamente

### Porta já em uso

- Verifique se as portas `3001` e `5173` estão disponíveis
- Caso necessário, altere a porta no `server/index.js` ou `vite.config.js`

### Notícias não aparecem

- Verifique se o servidor está rodando
- Acesse `/api/news/feminine-football` para verificar a resposta da API

## 👥 Desenvolvedores

Este projeto foi desenvolvido por:

- **Matheus da Costa Barroso**
- **Matheus Kitamura**
- **Victor Oliveira Alves**
- **João Guilherme Guida**

---

**Desenvolvido para o Challenge da FIAP e para o futebol feminino.**