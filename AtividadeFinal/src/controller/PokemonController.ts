import { Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { Pokemon } from '../models/Pokemon';

const pokemonRepository = AppDataSource.getRepository(Pokemon);

export class PokemonController {
    // Listar todos os pokemons
    async list(req: Request, res: Response) {
        const pokemon = await pokemonRepository.find();
        res.status(200).json(pokemon);
        return;
    }

    // Criar novo pokemon
    async create(req: Request, res: Response) {
        const { name, tipo1,tipo2,level } = req.body;

        

        if(name == '' || tipo1 =='' || level == null){
            res.status(400).json({message: 'Preencha os campos necessarios: Name, Tipo 1 e Level!'})
            return;
        }

        const pokemon = pokemonRepository.create({ name, tipo1,tipo2,level });
            await pokemonRepository.save(pokemon);
            res.status(201).json(pokemon);
            return;
    }

    // Buscar Pokemon por nome
    async show(req: Request, res: Response) {
        const { name } = req.params;

        const pokemon = await pokemonRepository.findOneBy({ name: String(name) });

        if (!pokemon) {
            res.status(404).json({ message: 'Pokemon não encontrado' });
            return;
        }

        res.status(200).json(pokemon);
        return;
    }

    // Atualizar Pokemon
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, tipo1,tipo2,level } = req.body;

        const pokemon = await pokemonRepository.findOneBy({ id: Number(id) });

        if (!pokemon) {
            res.status(404).json({ message: 'Pokemon não encontrado' });
            return;
        }

        if(!name ||!tipo1||!tipo2 || !level){
            res.status(400).json({message: 'Preencha pelo menos um dos campos'})
            return;
        }

        if(name !== null){
            pokemon.name = name;
        }

        if(tipo1 !== null){
            pokemon.tipo1 = tipo1;
        }

        if(tipo2 !== null){
            pokemon.tipo2 = tipo2;
        }

        if(level !== null){
            pokemon.level = level;
        }

        await pokemonRepository.save(pokemon);
        res.status(200).json(pokemon);
        return;
    }

    // Deletar Pokemon
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const pokemon = await pokemonRepository.findOneBy({ id: Number(id) });

        if (!pokemon) {
            res.status(404).json({ menssage: 'Pokemon não encontrado' });
            return;
        }

        await pokemonRepository.remove(pokemon);

        res.status(204).send();
        return;
    }
}