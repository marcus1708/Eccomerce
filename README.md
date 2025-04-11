<<<<<<< HEAD
# E-commerce React com API
=======
# 🛒 Ecommerce 
>>>>>>> refs/remotes/origin/main

Este é um projeto de e-commerce construído com **React**, **TypeScript**, **TailwindCSS** e **ShadCN/UI**, utilizando a API [Serverest](https://serverest.dev/) para simular funcionalidades de um backend.

## Funcionalidades

- Cadastro e login de usuários
- Listagem de produtos com busca por nome
- Cadastro e edição de produtos
- Adição de produtos ao carrinho
- Tela de carrinho com opção de finalizar ou cancelar compra
- Tela de pagamento com validação de data (mês/ano) e animação de sucesso
- Design responsivo e moderno

## Tecnologias Utilizadas !

- React + Vite
- TypeScript
- TailwindCSS
- Axios
- React Router DOM
- ShadCN/UI
- Lucide React (ícones)
- Framer Motion (animações)
- Radix UI Tooltip

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

   ou

   ```bash
   yarn
   ```

3. Execute o projeto:
   ```bash
   npm run dev
   ```

## Estrutura de Pastas

```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── input.tsx
├── contexts/
│   └── AuthContext.tsx
├── pages/
│   ├── AddProductPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── LoginPage.tsx
│   ├── ProductsPage.tsx
│   ├── RegisterPage.tsx
│   └── WelcomePage.tsx
├── App.tsx
└── main.tsx
```

## Observações

- O projeto utiliza LocalStorage para armazenar o carrinho.
- A API Serverest pode ter limitação de requisições.
- O campo de validade do cartão só aceita meses/anos futuros.

## Melhorias Futuras !!!

- Implementar autenticação JWT real
- Dashboard para administrador
- Histórico de pedidos
- Testes automatizados com Cypress

---

Desenvolvido por Marcus Vinicius QA 🚀


<<<<<<< HEAD
=======
---

## 💻 Como rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/marcus1708/Ecommerce.git
cd Ecommerce
```bash

2. **Rode o comando:**

npm install

npm run dev
>>>>>>> refs/remotes/origin/main
