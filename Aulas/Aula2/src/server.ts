import { log } from 'console';
import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

const porteiroMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`📢 Requisição recebida em: ${req.url}`);
    next(); // Permite a requisição continuar para a rota
};

const dataLog = (req: Request, res: Response, next: NextFunction) =>{
    let data: Date = new Date();
    console.log(`Requisição feita em: ${data}`);
    next();
}

app.use(dataLog);

app.use(porteiroMiddleware);

// 🔹 Rota GET (Buscar dados)
app.get('/usuarios', (req: Request, res: Response) => {
    res.status(200).json({ mensagem: 'Lista de usuários' });
});

// 🔹 Rota POST (Criar novo usuário)
app.post('/usuarios', (req: Request, res: Response) => {
    const { nome } = req.body;
    if (!nome) {
    res.status(400).json({ mensagem: 'Nome é obrigatório!' });
    }
    res.status(201).json({ mensagem: `Usuário ${nome} criado com sucesso!` });
});

app.get("/sobre", (req: Request, res: Response) =>{
    res.status(201).json({ Nome: "Paulo", Idade: 17, Descricao: "Jogador Pro de FF"})
})

app.post('/comentarios', (req: Request, res: Response) => {
    const { com } = req.body;
    if (!com) {
    res.status(400).json({ mensagem: 'Comentario vazio!' });
    }
    res.status(201).json({ mensagem: `Comentário recebido` });
});

app.delete('/comentarios/:id', (req: Request, res: Response) =>{
    const { id } = req.params;
    res.status(204).json({mensagem: "Comentario excluido"})
})

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));