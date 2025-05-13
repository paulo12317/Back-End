import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

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
    res.status(201).json({ mensagem: `Nome: Paulo\n Idade: 17 \n Descricao: Jogador Pro de FF`})
})

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));