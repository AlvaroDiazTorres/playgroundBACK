import { AuthService } from "../services/auth.service";
import { Response, Request, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import { HttpException } from '../exceptions/httpException';
import { DataStoredInToken } from '../interfaces/auth.interface';
import { User } from '@prisma/client';

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export class AuthController {
    public auth = new AuthService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = req.body
            //TODO validar el body
            const signUpUserData: Omit<User, 'password'> = await AuthService.register(userData)

            const dataStoredInToken: DataStoredInToken = { id: signUpUserData.id };
            const secretKey: string = process.env.SECRET_KEY || 'secret';
            const expiresIn: number = 60 * 60;

            const token = jwt.sign(dataStoredInToken, secretKey, { expiresIn });
            res.status(201).json({ data: signUpUserData, message: 'signup' });
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body
            console.log('looo',userData.email, userData.password)
            const { token, user } = await AuthService.login(userData.email, userData.password)
            console.log(token, user)

            const validSameSiteValues = ["none", "lax", "strict"] as const; 

            const sameSiteValue: "none" | "lax" | "strict" = validSameSiteValues.includes(process.env.COOKIE_SAME_SITE as "none" | "lax" | "strict")
            ? (process.env.COOKIE_SAME_SITE as "none" | "lax" | "strict")
            : "none";  


            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000 * 3,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                path: '/'
            })
            res.status(201).json({ message: 'Login successfully:', user })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('token')
            res.status(204).json({ message: 'Logout successfully:' })
        } catch (error) {
            next(error)
        }
    }

    static async getAuthenticatedUser (req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token;
            if (!token) {
                res.status(401).json({ message: "Not authenticated" });
                return;
            }
            const decoded = jwt.verify(token, TOKEN_PASSWORD) as any;
            const user = await AuthService.getUserById(decoded.id);
            if (!user) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
