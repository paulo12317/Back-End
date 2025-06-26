

---

````markdown
# 🧩 Pokémon Manager

Uma aplicação fullstack para cadastro e gerenciamento de usuários e pokémons, desenvolvida com TypeScript, TypeORM, MySQL e front-end em Vanilla JavaScript.

## 📋 Descrição

Este projeto foi criado com o objetivo de praticar conceitos de CRUD, integração entre front-end e back-end, e uso de banco de dados relacional. O sistema permite:

- Cadastro e login de usuários (com senhas criptografadas usando `bcryptjs`)
- Cadastro, listagem, edição e remoção de pokémons
- Front-end simples em HTML, CSS e JavaScript (sem frameworks)
- Back-end com Node.js, TypeScript, Express e TypeORM

---

## 🧰 Tecnologias Utilizadas

### Back-end:
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

### Front-end:
- HTML5
- CSS3
- JavaScript (ES6)

---

## 📁 Estrutura de Diretórios

```bash
📦 pokemon-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── model/
│   │   ├── routes/
│   │   ├── db/
│   │   └── server.ts
│   └── tsconfig.json
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── README.md
````

---

## 🔐 Funcionalidades

### Usuários:

* `POST /users/register`: Cadastro de novo usuário
* `POST /users/login`: Login de usuário (verifica senha com bcrypt)

### Pokémons:

* `POST /pokemons/register`: Cadastrar novo pokémon
* `GET /pokemons`: Listar todos os pokémons
* `PUT /pokemons/:id`: Editar dados de um pokémon
* `DELETE /pokemons/:id`: Remover um pokémon

---

## 🔧 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/paulo12317/Back-End.git
cd AtividadeFinal
```

### 4. Rode o servidor

```bash
npm run dev
```

### 5. Acesse o front-end

Abra o arquivo `public/index.html` em seu navegador para interagir com o sistema.

---

## 🧪 Exemplos de Uso (via Insomnia ou Postman)

### Registro de Usuário

```http
POST /users/register
Content-Type: application/json

{
  "username": "ashketchum",
  "password": "pikachu123"
}
```

### Cadastro de Pokémon

```http
POST /pokemons/register
Content-Type: application/json

{
  "name": "Pikachu",
  "type": "Electric",
  "trainerId": 1
}
```

---

## 🧑‍💻 Autor

Desenvolvido por [paulo Henrique](https://github.com/paulo12317)

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```

---
