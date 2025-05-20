import {Request, Response } from "express";
import { Produto, produtos } from "../models/Produto";


export const criarProduto = (req: Request, res: Response) =>{
    const {preco, id, nome} = req.body;
    if(!id || !nome || !preco){
        res.status(400).json({ mensagem: "Id, nome ou preco nn existe" })
        return;
    }
    const prod = new Produto(preco,id,nome)
    produtos.push(prod);
    res.status(201).json({ mensagem: "Usuário criado com sucesso!", produto: prod });
    return;
}

export const listarProdutos = (req: Request, res: Response) => {
    res.status(200).json(produtos);
    return;
};

export const buscarProdutoPorId = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const prod = produtos.find(u => u.id === id);
    if (!prod){
        res.status(404).json({ mensagem: "Produto não encontrado" });
        return;
    }
    res.status(200).json(prod);
    return;
};

export const atualizarProduto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, preco } = req.body

    if(!id){
        res.status(400).json({ mensagem: "ID é necessario" })
        return;
    }

    if(!nome && !preco){
        res.status(400).json({ mensagem: "Preencha pelo menos um dos campos" })
        return
    }

    const prod = produtos.find(u => u.id === id);

    if (!prod){
        res.status(404).json({ mensagem: "Produto não encontrado" })
        return;
    };

    prod.nome = nome || prod.nome;
    prod.preco = preco || prod.preco;

    res.status(200).json({ mensagem: "Produto atualizado com sucesso!", prod });
};

export const deletarProduto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = produtos.findIndex(u => u.id === id);
    if (index === -1){ 
        res.status(404).json({ mensagem: "Produto não encontrado" }) 
        return;
    };

    produtos.splice(index, 1);
    res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
};