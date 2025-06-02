import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Product } from "../models/Product";

const productRepository = AppDataSource.getRepository(Product);

export class ProductController{
    async list(req: Request,res:Response){
        const prod = await productRepository.find();
        res.json(prod);
        return;
    }

    async create(req:Request,res:Response){
        const {name,price,description} = req.body;

        const prod = productRepository.create({name,price,description});
        await productRepository.save(prod);

        res.status(201).json(prod);
        return;
    }

    async delete(req:Request,res:Response){
        const {id} = req.body;

        const prod = await productRepository.findOneBy({id:Number(id)});

        if(!prod){
            res.status(401).json({ menssagem: "Produto não encontrado" });
            return;
        }

        await productRepository.remove(prod);
        res.status(204).send();
        return;
    }

    async show(req:Request,res:Response){
        const {id} = req.params;
        const prod = await productRepository.findOneBy({id:Number(id)});

        if(!prod){
            res.status(404).json({menssagem: "Produto não encontrado!"});
            return;
        }
        res.status(201).json(prod);
        return;
    }

    async shew(req:Request,res:Response){
        const {name} = req.params;
        const prod = await productRepository.findOneBy({name:String(name)});

        if(!prod){
            res.status(404).json({menssagem: "Produto não encontrado!"});
            return;
        }
        res.status(201).json(prod);
        return;
    }

    async update(req:Request,res:Response){
        const {id} = req.params;
        const {name,price,description} = req.body;

        const prod = await productRepository.findOneBy({id:Number(id)});

        if(!prod){
            res.status(404).json({menssagem: "Produto não encontrado"})
            return;
        }

        prod.name = name;
        prod.description = description;
        prod.price = price;

        await productRepository.save(prod)
        res.json(prod);
        return;
    }
}