# Atividade 02 — API de Produtos

## Descrição

Desenvolvimento de uma API REST para gerenciamento de produtos utilizando Node.js e Express.

A API permite realizar as operações básicas de CRUD:

- Criar produtos
- Listar produtos
- Atualizar produtos
- Excluir produtos

## Tecnologias utilizadas

- Node.js
- Express
- CORS
- Postman

## Repositório original

Este projeto foi desenvolvido com base no projeto disponibilizado no repositório original:

[Repositório original — atividade02-aula04-api](https://github.com/cortevinicius/atividade02-aula04-api)

## Endpoints

| Operação | Método | Endpoint |
|---|---|---|
| Listar produtos | GET | `/produtos` |
| Criar produto | POST | `/produtos` |
| Atualizar produto | PUT | `/produtos/:id` |
| Excluir produto | DELETE | `/produtos/:id` |

## Códigos de resposta

- **200 OK** — Operação realizada com sucesso.
- **201 Created** — Produto criado com sucesso.
- **404 Not Found** — Produto não encontrado.
- **400 Bad Request** — Dados inválidos ou incompletos.

## Postman

[Collection da API no Postman](https://cortevinicius1-2446490.postman.co/workspace/Vinicius-Corte's-Workspace~cabccbd2-f9f1-49c4-8edf-5165d39b47c9/collection/57955158-b0c1d528-aa76-4a96-b777-f68bc57342eb?action=share&source=copy-link&creator=57955158)

## Conclusão

A atividade permitiu colocar em prática o desenvolvimento e teste de uma API REST, utilizando os métodos HTTP GET, POST, PUT e DELETE para realizar as operações de CRUD em produtos.