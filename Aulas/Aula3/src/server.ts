import express, { Application } from "express"
import usurioRoutes from "./routes/UsuarioRoutes"

const app:Application = express()

app.use(express.json());

// Rotas da aplicação 

app.use("api",usurioRoutes);

app.listen(3000, () =>{
    console.log(`👌 servidor rodando em http://localhost:3000`);
    
})