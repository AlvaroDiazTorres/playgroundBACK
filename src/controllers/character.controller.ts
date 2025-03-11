import { HttpException } from "@/exceptions/httpException";
import { CharacterService } from "@/services/character.service";
import {Response, Request, NextFunction} from 'express'

export class CharacterController{
    static async getById(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid Character ID");

            // pasar a entero
            const Character = await CharacterService.getById(id)
            res.status(200).json(Character)
        }catch(error){
            next(error)
        }
    }

    static async getAll(req:Request, res:Response, next: NextFunction){
        try{
            const { title } = req.query;
            const user = await CharacterService.getAll(title as string)
            res.status(200).json(user)
        }catch(error){
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const characterData = req.body;
            const userId = req.user?.id;
    
            if (!userId) {
                throw new HttpException(400, "User creator ID is required");
            }
    
            // Convertir userId a entero (si es string o float)
            const userIdInt = Number.isInteger(userId) 
                ? userId 
                : parseInt(String(userId), 10); // Si es float o string numérico
    
            if (isNaN(userIdInt)) {
                throw new HttpException(400, "Invalid user ID");
            }
    
            // Convertir level a entero
            const level = parseInt(characterData.level, 10);
            if (isNaN(level)) {
                throw new HttpException(400, "Invalid level value");
            }
    
            const newCharacterData = {
                ...characterData,
                level: level,
                idUserAuthor: userIdInt,
            };
    
            const newCharacter = await CharacterService.create(userIdInt, newCharacterData);
            res.status(200).json(newCharacter);
        } catch (error) {
            next(error);
        }
    }

    static async update(req:Request, res:Response, next: NextFunction){
        try{
            const characterData = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid character ID");

            const updatedCharacter = await CharacterService.update(id, characterData)
            res.status(200).json(updatedCharacter)
        }catch(error){
            next(error)
        }
    }

    static async delete(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid Character ID");

            const deletedCharacter = await CharacterService.delete(id)
            res.status(200).json(deletedCharacter)
        }catch(error){
            next(error)
        }
    }
   
    static async getMyCharacter(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid Character ID");
            
            const userId = req.user?.id
            if(!userId) throw new HttpException(400, "User creator ID is required");

            const character = await CharacterService.getMyCharacter(userId, id)
            res.status(200).json(character)
        }catch(error){
            next(error)
        }
    }
}
