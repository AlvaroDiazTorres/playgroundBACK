import { CustomJwtPayload } from '@/utils/CustomJwtPayload'
import {Response, Request, NextFunction} from 'express'
import jwt from "jsonwebtoken"

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'
export const isAuthenticate = (req:Request, res:Response, next:NextFunction):any => {
    console.log('Cookies recibidas:', req.cookies);
    const token = req.cookies.token
    if(!token) {
        console.log('No token found in cookies');
        return res.status(401).json({error: 'Access denied'})
    }

    try{
        const tokenDecodificado = jwt.verify(token, TOKEN_PASSWORD)
        req.user = tokenDecodificado as CustomJwtPayload
        console.log('Token verificado correctamente');
        next()
    }catch(error){
        console.log('Error verificando token:', error);
        res.status(401).json({error:'Invalid token'})
    }
}