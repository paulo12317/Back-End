import { User } from "../models/User";
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import bcrypt from 'bcryptjs'

const userRepository = AppDataSource.getRepository(User);

export class userController {

    async createUser(req:Request, res:Response){
        const {email, password} = req.body;
        
        if(!email  || !password){
            res.status(400).json({message: "Insira todos campos!"})
        }

        const verificaEmail = await userRepository.findOneBy({email: email})

        if(verificaEmail) {
            res.status(409).json({ message: "E-mail já em uso!" });
            return;
        }

        const user = new User(email, password);

        if(!user) {
            res.status(500).json({ message: "Erro ao registar usuário" })
            return
        }

        await userRepository.save(user);
        res.status(201).json({ message: "Usuário criado com sucesso", user: user })
        return;
    }

    async Login(req:Request, res: Response){
        const {email,password} = req.body;

        if(!email  || !password){
            res.status(400).json({message: "Insira todos campos!"});
            return;
        }

        const verificaEmail = await userRepository.findOneBy({email: email})
        if(!verificaEmail){
            res.status(404).json({message: "E-mail não existe"});
            return;
        }

        const isValid = await bcrypt.compare(password, verificaEmail.password);

        if(!isValid){
            res.status(401).json({message: "Senha invalida!"});
            return;
        }

        res.status(200).json({message: "Login realizado com sucesso!"})
        return;
    }

    async listUser(req: Request, res: Response){
        const user = await userRepository.find();
        res.status(200).json(user);
        return;
    }
}