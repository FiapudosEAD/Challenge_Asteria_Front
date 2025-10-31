# Challenge Astéria - Frontend (React)

Este é o repositório do frontend para o projeto Challenge Astéria. É uma aplicação web moderna construída com React (usando Vite) e estilizada com Tailwind CSS.

Esta aplicação consome a API RESTful Java ([Challenge\_Asteria\_Back](https://www.google.com/search?q=https://github.com/seu-usuario/Challenge_Asteria_Back)) para fornecer uma interface de usuário para autenticação, visualização de dashboards e gerenciamento de vendas, produtos e pontos de venda (PDVs).

## Relação com o Backend

Este projeto é o cliente para a API `Challenge_Asteria_Back`. Para que este frontend funcione completamente, a API backend **deve** estar em execução.

A aplicação está configurada para se comunicar com a API na URL base: `http://localhost:8080/api`.

## Tecnologias Utilizadas

O projeto é construído com um stack moderno de frontend:

  * **React 19**
  * **Vite** (Build tool e servidor de desenvolvimento)
  * **React Router 7** (Para roteamento de páginas)
  * **Tailwind CSS** (Para estilização)
  * **Axios** (Para realizar requisições à API)
  * **React Icons** (Para ícones)
  * **ESLint** (Para linting de código)

## Funcionalidades

  * **Autenticação de Usuário**: Telas de Login e Cadastro que utilizam o `AuthContext`.
  * **Contexto de Autenticação**: Gerenciamento global do estado de autenticação (usuário e token JWT), com persistência no `localStorage`.
  * **Roteamento Protegido**: Separação de rotas públicas (Login, Registro) e rotas privadas (Dashboard, Produtos, etc.) que exigem autenticação.
  * **Intercepção de API**: O `axios` é configurado para enviar automaticamente o token JWT (`Authorization: Bearer ...`) em todas as requisições autenticadas.
  * **Logout Automático**: O sistema faz logout e redireciona para a página de login automaticamente caso a API retorne um erro 401 (Não Autorizado) ou 403 (Proibido).
  * **Dashboard (Página Home)**: Exibe cards com estatísticas de vendas (Total, Concluídas, Pendentes, Ticket Médio) e uma tabela de vendas recentes, com filtros por status ou tipo.
  * **Gerenciamento de Produtos (CRUD)**: Página com tabela para listar, criar, editar e excluir produtos, consumindo os endpoints `/api/produtos`.
  * **Gerenciamento de Vendas (CRUD)**: Página com tabela para listar, criar, editar e excluir vendas, consumindo os endpoints `/api/vendas` e `/api/dashboard/vendas`.
  * **Gerenciamento de PDVs**: Página dedicada para o gerenciamento de Pontos de Venda (PDVs).
  * **Componentes Reutilizáveis**: Inclui componentes como `Table`, `Modal`, `Input`, `Button`, `Navbar`, etc., para uma interface de usuário consistente.

## Como Executar

### Pré-requisitos

1.  **Node.js**: Versão 18 ou superior.
2.  **Backend em Execução**: O projeto `Challenge_Asteria_Back` **deve** estar em execução em `http://localhost:8080`.

### Passos

1.  **Clonar o Repositório**

    ```bash
    git clone https://github.com/seu-usuario/Challenge_Asteria_Front.git
    cd Challenge_Asteria_Front
    ```

2.  **Instalar Dependências**

    ```bash
    npm install
    ```

    *(ou `yarn install` se preferir)*

3.  **Executar a Aplicação**

    ```bash
    npm run dev
    ```

4.  **Acessar**
    A aplicação estará disponível no seu navegador em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## Estrutura do Projeto

```
src/
├── components/   # Componentes reutilizáveis (Input, Table, Modal, etc.)
├── context/      # Gerenciadores de estado global (AuthContext.jsx)
├── hooks/        # Hooks customizados (useForm.js)
├── pages/        # Componentes de página (Home, Login, ProductsPage, etc.)
├── routes/       # Definição das rotas públicas e privadas
├── services/     # Configuração do Axios (api.js)
├── utils/        # Funções utilitárias (formatters.js)
├── index.css     # Estilos globais do Tailwind
└── main.jsx      # Ponto de entrada da aplicação React
```