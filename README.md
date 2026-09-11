# ⚽ Passa a Bola

Plataforma web de futebol feminino desenvolvida em equipe durante a graduação na FIAP.

## 🎯 Sobre o projeto

O **Passa a Bola** foi desenvolvido para oferecer uma experiência centralizada de acompanhamento do futebol feminino, reunindo informações de jogos, classificação, notícias e Fantasy League em uma única plataforma.

### Principais funcionalidades

- 📊 Tabela de classificação
- ⚽ Jogos e resultados
- 📰 Notícias sobre futebol feminino
- 🏆 Fantasy League e ranking
- 🔐 Autenticação de usuários
- 📱 Interface responsiva
- 🔌 API própria para integração entre frontend e backend

## 🧱 Arquitetura

O projeto é dividido em duas partes principais:

- **Frontend:** aplicação React responsável pela interface e experiência do usuário.
- **Backend:** API Node.js + Express responsável por autenticação, dados e regras da aplicação.

Os dados de desenvolvimento são armazenados em um arquivo JSON, simplificando a execução e demonstração do projeto sem necessidade de configurar um banco de dados externo.

## 🛠️ Tecnologias

### Frontend

- React 18
- Vite
- React Router
- Tailwind CSS
- Recharts
- Context API

### Backend

- Node.js 18+
- Express 5
- Bcrypt
- JSON Web Token
- Helmet
- CORS
- Express Rate Limit

## 📁 Estrutura

```text
Passa-a-bola/
├── frontend/
│   ├── public/assets/    # Imagens, ícones e mídia da aplicação
│   └── src/
│       ├── components/  # Componentes reutilizáveis
│       ├── contexts/    # Contextos de estado
│       ├── hooks/       # Hooks personalizados
│       ├── pages/       # Páginas da aplicação
│       ├── services/    # Comunicação com a API
│       └── config/      # Configurações
├── server/
│   ├── db/             # Dados e seed do ambiente local
│   ├── routes/         # Rotas da API
│   └── index.js        # Servidor Express
└── package.json
```

## 🚀 Como executar

### Pré-requisitos

- Node.js 18 ou superior
- npm
- Git

### Instalação

```bash
git clone https://github.com/victoralves13/Passa-a-bola.git
cd Passa-a-bola
npm run install:all
npm run seed
npm run dev
```

Depois, acesse o frontend em `http://localhost:5173`.

O backend roda por padrão na porta `3001`.

### Scripts principais

```bash
npm run install:all  # instala as dependências do projeto
npm run dev          # inicia frontend e backend
npm run server       # inicia somente o backend
npm run client       # inicia somente o frontend
npm run seed         # gera os dados iniciais
```

## 🔐 Ambiente de demonstração

O projeto possui usuários de demonstração criados pelo script de seed. As credenciais abaixo são destinadas exclusivamente ao ambiente local de desenvolvimento:

- **Administrador:** `admin@passabola.com` / `123456`
- **Usuário:** `user@passabola.com` / `123456`

Não utilize essas credenciais em ambientes reais.

## 🔌 API

Entre os endpoints disponíveis estão:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/verify`
- `GET /api/games`
- `GET /api/teams`
- `GET /api/ranking`
- `GET /api/news/feminine-football`

## 🌐 Demonstração

Versão publicada do projeto:

https://passa-a-bola-project.vercel.app/

## 👥 Projeto acadêmico

Projeto desenvolvido em equipe no contexto do Challenge da FIAP para a solução **Passa a Bola**.

**Equipe:**

- Matheus da Costa Barroso
- Matheus Kitamura
- Victor Oliveira Alves
- João Guilherme Guida

---

Desenvolvido com React, Node.js e muita dedicação ao futebol feminino. ⚽