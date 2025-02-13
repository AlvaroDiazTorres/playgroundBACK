import { HttpException } from "@/exceptions/httpException";
import { OfferService } from "@/services/offer.service";
import {Response, Request, NextFunction} from 'express'

export class OfferController{
    static async getById(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            // pasar a entero
            const offer = await OfferService.getById(id)
            res.status(200).json(offer)
        }catch(error){
            next(error)
        }
    }

    static async getAll(req:Request, res:Response, next: NextFunction){
        try{
            //localhost:3000/offer?title=XXXXXX
            const { title } = req.query;
            const user = await OfferService.getAll(title as string)
            res.status(200).json(user)
        }catch(error){
            next(error)
        }
    }

    static async create(req:Request, res:Response, next: NextFunction){
        try{
            const offerData = req.body
            const userId = req.user?.id
            if (!userId) throw new HttpException(400, "User creator ID is required");

            const newOffer = await OfferService.create(userId, offerData)
            res.status(200).json(newOffer)
        }catch(error){
            next(error)
        }
    }
    static async update(req:Request, res:Response, next: NextFunction){
        try{
            const offerData = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const updatedOffer = await OfferService.update(id, offerData)
            res.status(200).json(updatedOffer)
        }catch(error){
            next(error)
        }
    }

    static async delete(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const deletedOffer = await OfferService.delete(id)
            res.status(200).json(deletedOffer)
        }catch(error){
            next(error)
        }
    }
    static async rate(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const {value} = req.body
            const userId = req.user?.id
            if(!userId) throw new HttpException(400, "User creator ID is required");

            await OfferService.rate(userId, id, value)
            res.status(200).json({message: 'Offer rate successfully'})
        }catch(error){
            next(error)
        }
    }

    static async getRate(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            await OfferService.getRate(id)
            res.status(200).json({message: 'Offer rate successfully'})
        }catch(error){
            next(error)
        }
    }
}
