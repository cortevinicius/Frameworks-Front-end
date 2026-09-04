const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let produtos = [
    {
        id: 1,
        nome: "Teclado",
        preco: 100
    },
    {
        id: 2,
        nome: "Mouse",
        preco: 50
    }
];

// GET - Listar todos os produtos
app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});

// GET - Buscar produto por ID
app.get("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.status(200).json(produto);
});

// POST - Criar produto
app.post("/produtos", (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({
            mensagem: "Nome e preço são obrigatórios"
        });
    }

    const novoProduto = {
        id: produtos.length > 0
            ? produtos[produtos.length - 1].id + 1
            : 1,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// PUT - Atualizar produto
app.put("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({
            mensagem: "Nome e preço são obrigatórios"
        });
    }

    produto.nome = nome;
    produto.preco = preco;

    res.status(200).json(produto);
});

// DELETE - Excluir produto
app.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = produtos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    const produtoExcluido = produtos.splice(indice, 1);

    res.status(200).json({
        mensagem: "Produto excluído com sucesso",
        produto: produtoExcluido[0]
    });
});

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`API rodando em http://localhost:${PORTA}`);
});