import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { OrderItem } from "../models/OrderItem";
import { Favorites } from "../models/Favorites";
import { Dish } from "../models/Dish";

const dishRepository = AppDataSource.getRepository(Dish)

export class DishController{
    async list(req:Request, res:Response){
        const dish = dishRepository.find();
        res.json(dish);
        return;
    }

    async create(req:Request,res:Response){
        const { name,description, price, available } = req.body;
        const dish = dishRepository.create({ name, description, price, available }) 
        res.status(201).json(dish);
        return;
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const dish = await dishRepository.findOneBy({ id: Number(id) });

        if (!dish) {
            res.status(404).json({ message: 'Dish não encontrado' });
            return;
        }

        res.json(dish);
        return;
    }

    // Atualizar Dish
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name,description, price, available } = req.body;

        const dish = await dishRepository.findOneBy({ id: Number(id) });

        if (!dish) {
            res.status(404).json({ message: 'Order não encontrado' });
            return;
        }

        dish.name = name
        dish.description = description
        dish.price = price
        dish.available =available


        await dishRepository.save(dish);

        res.json(dish);
        return;
    }

    // Deletar Dish
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const dish = await dishRepository.findOneBy({ id: Number(id) });

        if (!dish) {
            res.status(404).json({ menssage: 'Dish não encontrado' });
            return;
        }

        await dishRepository.remove(dish);
        res.status(204).send();
        return;
    }
}