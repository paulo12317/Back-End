import express, { Application } from "express";
import userRoutes from "./routes/UserRoutes";
import prodRoutes from "./routes/ProductRoutes"
import { AppDataSource } from "./database/data-source";

const app: Application = express();

app.use(express.json());
AppDataSource.initialize()
.then(() => {

    app.use('/api', userRoutes);
    app.use("/api", prodRoutes);

    app.listen(3000, () => console.log('Server rodando na porta 3000'));
})
.catch((error) => console.log(error));

