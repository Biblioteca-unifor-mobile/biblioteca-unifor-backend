# Payloads dos Endpoints - Books e Book Copies

## 📚 BOOKS ENDPOINTS

### 1. POST /books - Criar um novo livro (apenas ADMINISTRADOR)

**URL:** `POST http://localhost:3000/books`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Body (Request):**
```json
{
  "isbn": "978-85-333-0227-3",
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien",
  "coAutores": ["Christopher Tolkien"],
  "edicao": "1ª edição",
  "anoEdicao": 2023,
  "idioma": "Português",
  "publicacao": "HarperCollins",
  "resumo": "Uma aventura épica na Terra Média com hobbits, anões e magos em busca de destruir um anel poderoso.",
  "imageUrl": "https://example.com/capa-senhor-aneis.jpg",
  "tipo": "FISICO",
  "numeroExemplares": 5
}
```

**Response (200 OK):**
```json
{
  "id": "clxka1z0q0000abcde1234567",
  "isbn": "978-85-333-0227-3",
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien",
  "coAutores": ["Christopher Tolkien"],
  "edicao": "1ª edição",
  "anoEdicao": 2023,
  "idioma": "Português",
  "publicacao": "HarperCollins",
  "resumo": "Uma aventura épica na Terra Média...",
  "imageUrl": "https://example.com/capa-senhor-aneis.jpg",
  "tipo": "FISICO",
  "copies": [
    {
      "id": "copy1",
      "bookId": "clxka1z0q0000abcde1234567",
      "copyNumber": 1,
      "status": "DISPONIVEL",
      "condition": "BOA"
    }
  ]
}
```

---

### 2. GET /books - Listar todos os livros com paginação e filtros

**URL:** `GET http://localhost:3000/books?page=1&limit=10&titulo=Senhor&autor=Tolkien&isbn=978&anoEdicao=2023&edicao=1ª&search=fantasia`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Query Parameters (Opcionais):**
- `page` (number, default: 1) - Número da página
- `limit` (number, default: 10) - Itens por página
- `titulo` (string) - Filtro por título (busca parcial)
- `autor` (string) - Filtro por autor (busca parcial)
- `isbn` (string) - Filtro por ISBN (busca parcial)
- `anoEdicao` (number) - Filtro por ano de edição exato
- `edicao` (string) - Filtro por edição (busca parcial)
- `search` (string) - Busca geral em múltiplos campos

**Exemplos de URLs:**
```
GET /books
GET /books?page=2&limit=20
GET /books?titulo=Senhor&autor=Tolkien
GET /books?search=fantasia
GET /books?anoEdicao=2023
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "clxka1z0q0000abcde1234567",
      "isbn": "978-85-333-0227-3",
      "titulo": "O Senhor dos Anéis",
      "autor": "J.R.R. Tolkien",
      "coAutores": ["Christopher Tolkien"],
      "edicao": "1ª edição",
      "anoEdicao": 2023,
      "idioma": "Português",
      "publicacao": "HarperCollins",
      "resumo": "Uma aventura épica na Terra Média...",
      "imageUrl": "https://example.com/capa-senhor-aneis.jpg",
      "tipo": "FISICO"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "pages": 1
}
```

---

### 3. GET /books/:id - Obter detalhes de um livro específico

**URL:** `GET http://localhost:3000/books/clxka1z0q0000abcde1234567`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "id": "clxka1z0q0000abcde1234567",
  "isbn": "978-85-333-0227-3",
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien",
  "coAutores": ["Christopher Tolkien"],
  "edicao": "1ª edição",
  "anoEdicao": 2023,
  "idioma": "Português",
  "publicacao": "HarperCollins",
  "resumo": "Uma aventura épica na Terra Média...",
  "imageUrl": "https://example.com/capa-senhor-aneis.jpg",
  "tipo": "FISICO",
  "copies": [
    {
      "id": "copy1",
      "bookId": "clxka1z0q0000abcde1234567",
      "copyNumber": 1,
      "status": "DISPONIVEL",
      "condition": "BOA"
    }
  ]
}
```

---

### 4. PATCH /books/:id - Atualizar um livro (apenas ADMINISTRADOR)

**URL:** `PATCH http://localhost:3000/books/clxka1z0q0000abcde1234567`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Body (Request - Todos os campos opcionais):**
```json
{
  "isbn": "978-85-333-0227-3",
  "titulo": "O Senhor dos Anéis - Edição Especial",
  "autor": "J.R.R. Tolkien",
  "coAutores": ["Christopher Tolkien", "Ed. Smith"],
  "edicao": "2ª edição",
  "anoEdicao": 2024,
  "idioma": "Português",
  "publicacao": "HarperCollins Brasil",
  "resumo": "Uma aventura épica revisada e ampliada...",
  "imageUrl": "https://example.com/capa-senhor-aneis-v2.jpg",
  "tipo": "FISICO"
}
```

**Response (200 OK):**
```json
{
  "id": "clxka1z0q0000abcde1234567",
  "isbn": "978-85-333-0227-3",
  "titulo": "O Senhor dos Anéis - Edição Especial",
  "autor": "J.R.R. Tolkien",
  "coAutores": ["Christopher Tolkien", "Ed. Smith"],
  "edicao": "2ª edição",
  "anoEdicao": 2024,
  "idioma": "Português",
  "publicacao": "HarperCollins Brasil",
  "resumo": "Uma aventura épica revisada e ampliada...",
  "imageUrl": "https://example.com/capa-senhor-aneis-v2.jpg",
  "tipo": "FISICO"
}
```

---

### 5. DELETE /books/:id - Deletar um livro (apenas ADMINISTRADOR)

**URL:** `DELETE http://localhost:3000/books/clxka1z0q0000abcde1234567`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "message": "Livro deletado com sucesso"
}
```

---

## 📖 BOOK COPIES ENDPOINTS

### 1. POST /book-copies - Criar um novo exemplar (apenas ADMINISTRADOR)

**URL:** `POST http://localhost:3000/book-copies`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Body (Request):**
```json
{
  "bookId": "clxka1z0q0000abcde1234567",
  "copyNumber": 1,
  "status": "DISPONIVEL",
  "condition": "BOA"
}
```

**Valores possíveis para `status`:**
- `DISPONIVEL`
- `ALUGADO`
- `RESERVADO`
- `INDISPONIVEL`

**Valores possíveis para `condition`:**
- `MUITO_BOA`
- `BOA`
- `CONSERVADO`
- `RUIM`
- `MUITO_RUIM`

**Response (201 Created):**
```json
{
  "id": "copyclxka1z0q0000xyz",
  "bookId": "clxka1z0q0000abcde1234567",
  "copyNumber": 1,
  "status": "DISPONIVEL",
  "condition": "BOA"
}
```

---

### 2. GET /book-copies - Listar todos os exemplares

**URL:** `GET http://localhost:3000/book-copies`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
[
  {
    "id": "copyclxka1z0q0000xyz",
    "bookId": "clxka1z0q0000abcde1234567",
    "copyNumber": 1,
    "status": "DISPONIVEL",
    "condition": "BOA"
  },
  {
    "id": "copyclxka1z0q0001xyz",
    "bookId": "clxka1z0q0000abcde1234567",
    "copyNumber": 2,
    "status": "ALUGADO",
    "condition": "CONSERVADO"
  }
]
```

---

### 3. GET /book-copies/book/:bookId - Listar exemplares de um livro específico

**URL:** `GET http://localhost:3000/book-copies/book/clxka1z0q0000abcde1234567`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
[
  {
    "id": "copyclxka1z0q0000xyz",
    "bookId": "clxka1z0q0000abcde1234567",
    "copyNumber": 1,
    "status": "DISPONIVEL",
    "condition": "BOA"
  },
  {
    "id": "copyclxka1z0q0001xyz",
    "bookId": "clxka1z0q0000abcde1234567",
    "copyNumber": 2,
    "status": "ALUGADO",
    "condition": "CONSERVADO"
  }
]
```

---

### 4. GET /book-copies/:id - Obter detalhes de um exemplar específico

**URL:** `GET http://localhost:3000/book-copies/copyclxka1z0q0000xyz`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "id": "copyclxka1z0q0000xyz",
  "bookId": "clxka1z0q0000abcde1234567",
  "copyNumber": 1,
  "status": "DISPONIVEL",
  "condition": "BOA",
  "book": {
    "id": "clxka1z0q0000abcde1234567",
    "isbn": "978-85-333-0227-3",
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien"
  }
}
```

---

### 5. PATCH /book-copies/:id - Atualizar um exemplar (apenas ADMINISTRADOR)

**URL:** `PATCH http://localhost:3000/book-copies/copyclxka1z0q0000xyz`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Body (Request - Todos os campos opcionais):**
```json
{
  "status": "RESERVADO",
  "condition": "CONSERVADO"
}
```

**Response (200 OK):**
```json
{
  "id": "copyclxka1z0q0000xyz",
  "bookId": "clxka1z0q0000abcde1234567",
  "copyNumber": 1,
  "status": "RESERVADO",
  "condition": "CONSERVADO"
}
```

---

### 6. DELETE /book-copies/:id - Deletar um exemplar (apenas ADMINISTRADOR)

**URL:** `DELETE http://localhost:3000/book-copies/copyclxka1z0q0000xyz`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "message": "Exemplar deletado com sucesso"
}
```

---

## 🔐 Notas importantes sobre autenticação

1. **Token JWT obrigatório** em todos os endpoints (exceto login/registro)
2. **Apenas ADMINISTRADOR** pode:
   - POST /books (criar livros)
   - PATCH /books/:id (atualizar livros)
   - DELETE /books/:id (deletar livros)
   - POST /book-copies (criar exemplares)
   - PATCH /book-copies/:id (atualizar exemplares)
   - DELETE /book-copies/:id (deletar exemplares)

3. **Todos os usuários autenticados** podem:
   - GET /books (listar livros)
   - GET /books/:id (ver detalhes de livro)
   - GET /book-copies (listar exemplares)
   - GET /book-copies/:id (ver detalhes de exemplar)
   - GET /book-copies/book/:bookId (listar exemplares de um livro)

---

## 📝 Exemplo usando cURL

```bash
# Criar um livro
curl -X POST http://localhost:3000/books \
  -H "Authorization: Bearer seu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{
    "isbn": "978-85-333-0227-3",
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "coAutores": ["Christopher Tolkien"],
    "edicao": "1ª edição",
    "anoEdicao": 2023,
    "idioma": "Português",
    "publicacao": "HarperCollins",
    "tipo": "FISICO",
    "numeroExemplares": 5
  }'

# Listar livros com filtro
curl -X GET "http://localhost:3000/books?page=1&limit=10&search=Tolkien" \
  -H "Authorization: Bearer seu_token_jwt"

# Obter um livro específico
curl -X GET http://localhost:3000/books/clxka1z0q0000abcde1234567 \
  -H "Authorization: Bearer seu_token_jwt"

# Criar um exemplar
curl -X POST http://localhost:3000/book-copies \
  -H "Authorization: Bearer seu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": "clxka1z0q0000abcde1234567",
    "copyNumber": 1,
    "status": "DISPONIVEL",
    "condition": "BOA"
  }'

# Listar exemplares de um livro
curl -X GET http://localhost:3000/book-copies/book/clxka1z0q0000abcde1234567 \
  -H "Authorization: Bearer seu_token_jwt"
```

---

---

## 🛒 CART ENDPOINTS

### 1. POST /cart/add/:bookCopyId - Adicionar exemplar à cesta

**URL:** `POST http://localhost:3000/cart/add/copyclxka1z0q0000xyz`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Body (Request):**
- Sem body necessário — o `bookCopyId` é extraído do URL

**Response (201 Created):**
```json
{
  "message": "Exemplar adicionado à cesta com sucesso",
  "cartItem": {
    "userMatricula": "2023001234",
    "bookId": "clxka1z0q0000abcde1234567",
    "addedAt": "2025-11-19T15:08:59Z",
    "book": {
      "id": "clxka1z0q0000abcde1234567",
      "isbn": "978-85-333-0227-3",
      "titulo": "O Senhor dos Anéis",
      "autor": "J.R.R. Tolkien"
    }
  }
}
```

---

### 2. GET /cart - Listar itens da cesta do usuário

**URL:** `GET http://localhost:3000/cart`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "message": "Cesta do usuário",
  "items": [
    {
      "userMatricula": "2023001234",
      "bookId": "clxka1z0q0000abcde1234567",
      "addedAt": "2025-11-19T15:08:59Z",
      "book": {
        "id": "clxka1z0q0000abcde1234567",
        "isbn": "978-85-333-0227-3",
        "titulo": "O Senhor dos Anéis",
        "autor": "J.R.R. Tolkien",
        "anoEdicao": 2023,
        "tipo": "FISICO",
        "copies": [
          {
            "id": "copyclxka1z0q0000xyz",
            "status": "DISPONIVEL",
            "condition": "BOA"
          }
        ]
      }
    }
  ],
  "total": 1
}
```

---

### 3. DELETE /cart/:bookId - Remover um livro da cesta (por bookId)

**URL:** `DELETE http://localhost:3000/cart/clxka1z0q0000abcde1234567`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "message": "Livro removido da cesta com sucesso",
  "bookId": "clxka1z0q0000abcde1234567",
  "userMatricula": "2023001234"
}
```

---

### 4. DELETE /cart - Limpar a cesta do usuário

**URL:** `DELETE http://localhost:3000/cart`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "message": "Cesta limpa com sucesso",
  "userMatricula": "2023001234",
  "itemsRemoved": 3
}
```

---

### 5. POST /cart/checkout - Converter cesta em empréstimo(s)

**URL:** `POST http://localhost:3000/cart/checkout`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Body (Request):**
```json
{
  "dataLimite": "2025-12-05T23:59:59Z"
}
```

**Notas sobre `dataLimite`:**
- Formato: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
- Deve ser uma data futura
- Exemplos válidos:
  - `2025-12-05T23:59:59Z`
  - `2025-11-25T18:00:00Z`

**Response (201 Created):**
```json
{
  "message": "Empréstimos criados com sucesso",
  "loans": [
    {
      "id": "loan1clxka1z0q0000xyz",
      "userMatricula": "2023001234",
      "bookCopyId": "copyclxka1z0q0000xyz",
      "dataEmprestimo": "2025-11-19T15:08:59Z",
      "dataLimite": "2025-12-05T23:59:59Z",
      "status": "ATIVO",
      "renovacoes": 0,
      "divida": 0.0,
      "bookCopy": {
        "id": "copyclxka1z0q0000xyz",
        "book": {
          "titulo": "O Senhor dos Anéis",
          "autor": "J.R.R. Tolkien"
        }
      }
    }
  ],
  "cartCleared": true
}
```

---

### 6. POST /cart/reserve/:bookId - Reservar um livro

**URL:** `POST http://localhost:3000/cart/reserve/clxka1z0q0000abcde1234567`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Body (Request):**
```json
{
  "dataLimite": "2025-12-05T23:59:59Z"
}
```

**Notas:**
- Use este endpoint quando **não há exemplares disponíveis**
- A reserva será ativada quando um exemplar ficar disponível
- A data limite é quando você vai buscar o livro quando estiver disponível

**Response (201 Created):**
```json
{
  "message": "Livro reservado com sucesso",
  "reservation": {
    "id": "res1clxka1z0q0000xyz",
    "userMatricula": "2023001234",
    "bookCopyId": "copyclxka1z0q0000xyz",
    "dataReserva": "2025-11-19T15:08:59Z",
    "dataLimite": "2025-12-05T23:59:59Z",
    "status": "ATIVA",
    "bookCopy": {
      "id": "copyclxka1z0q0000xyz",
      "book": {
        "id": "clxka1z0q0000abcde1234567",
        "titulo": "O Senhor dos Anéis",
        "autor": "J.R.R. Tolkien"
      }
    }
  }
}
```

---

### 7. POST /cart/return/:loanId - Devolver um livro emprestado

**URL:** `POST http://localhost:3000/cart/return/loan1clxka1z0q0000xyz`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Body (Request):**
- Sem body necessário — o `loanId` é extraído do URL

**Response (200 OK):**
```json
{
  "message": "Livro devolvido com sucesso",
  "loan": {
    "id": "loan1clxka1z0q0000xyz",
    "userMatricula": "2023001234",
    "bookCopyId": "copyclxka1z0q0000xyz",
    "dataEmprestimo": "2025-11-19T15:08:59Z",
    "dataLimite": "2025-12-05T23:59:59Z",
    "dataDevolucao": "2025-11-19T15:30:00Z",
    "status": "DEVOLVIDO",
    "renovacoes": 0,
    "divida": 0.0
  }
}
```

---

### 8. GET /cart/loans - Listar meus empréstimos

**URL:** `GET http://localhost:3000/cart/loans`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "message": "Meus empréstimos",
  "loans": [
    {
      "id": "loan1clxka1z0q0000xyz",
      "userMatricula": "2023001234",
      "bookCopyId": "copyclxka1z0q0000xyz",
      "dataEmprestimo": "2025-11-19T15:08:59Z",
      "dataLimite": "2025-12-05T23:59:59Z",
      "dataDevolucao": null,
      "status": "ATIVO",
      "renovacoes": 0,
      "divida": 0.0,
      "bookCopy": {
        "id": "copyclxka1z0q0000xyz",
        "copyNumber": 1,
        "status": "ALUGADO",
        "condition": "BOA",
        "book": {
          "id": "clxka1z0q0000abcde1234567",
          "isbn": "978-85-333-0227-3",
          "titulo": "O Senhor dos Anéis",
          "autor": "J.R.R. Tolkien",
          "anoEdicao": 2023
        }
      }
    }
  ],
  "total": 1
}
```

---

### 9. GET /cart/reservations - Listar minhas reservas

**URL:** `GET http://localhost:3000/cart/reservations`

**Headers:**
```json
{
  "Authorization": "Bearer {token_jwt}",
  "Content-Type": "application/json"
}
```

**Response (200 OK):**
```json
{
  "message": "Minhas reservas",
  "reservations": [
    {
      "id": "res1clxka1z0q0000xyz",
      "userMatricula": "2023001234",
      "bookCopyId": "copyclxka1z0q0000xyz",
      "dataReserva": "2025-11-19T15:08:59Z",
      "dataLimite": "2025-12-05T23:59:59Z",
      "status": "ATIVA",
      "bookCopy": {
        "id": "copyclxka1z0q0000xyz",
        "copyNumber": 2,
        "status": "ALUGADO",
        "condition": "BOA",
        "book": {
          "id": "clxka1z0q0000abcde1234567",
          "isbn": "978-85-333-0227-3",
          "titulo": "O Senhor dos Anéis",
          "autor": "J.R.R. Tolkien",
          "anoEdicao": 2023
        }
      }
    }
  ],
  "total": 1
}
```

---

## 🛒 Fluxo de uso do Cart

**Cenário 1: Alugar um livro (Checkout)**
```
1. GET /cart/loans               → Verificar empréstimos atuais
2. GET /cart                     → Ver itens na cesta
3. POST /cart/add/{bookCopyId}   → Adicionar exemplar
4. POST /cart/checkout           → Converter em empréstimo
5. GET /cart/loans               → Confirmar empréstimo criado
6. POST /cart/return/{loanId}    → Devolver livro depois
```

**Cenário 2: Reservar um livro (quando não há disponíveis)**
```
1. POST /cart/reserve/{bookId}   → Reservar livro
2. GET /cart/reservations        → Ver reservas ativas
3. Quando disponível, ir buscar o livro
4. POST /cart/checkout           → Fazer empréstimo
```

**Cenário 3: Gerenciar cesta**
```
1. GET /cart                     → Ver cesta
2. POST /cart/add/{bookCopyId}   → Adicionar itens
3. DELETE /cart/{bookId}         → Remover um livro específico
4. DELETE /cart                  → Limpar toda a cesta
```

---

## ✨ Dicas para testes

1. **Use Postman ou Insomnia** para testar os endpoints com interface visual
2. **Copie o token JWT** do login/register e use nos headers de Authorization
3. **IDs dinâmicos**: Substitua os IDs nos exemplos pelos IDs reais retornados pela API
4. **Status do exemplar**: DISPONIVEL, ALUGADO, RESERVADO, INDISPONIVEL
5. **Condição do exemplar**: MUITO_BOA, BOA, CONSERVADO, RUIM, MUITO_RUIM
6. **Data limite**: Use formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
7. **Autenticação**: Todos os endpoints requerem token JWT válido no header `Authorization: Bearer {token}`
