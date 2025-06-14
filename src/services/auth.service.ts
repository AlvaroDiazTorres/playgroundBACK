import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// usar un patron: singlenton
//const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export class AuthService {
    static async register(userData: {
        name: string;
        surname: string;
        email: string;
        password: string;
        role?: string;
    }): Promise<Omit<User, 'password'>> {
        const findUser: User | null = await prisma.user.findUnique({where: {email: userData.email}})
        if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`)

        const passwordEncrypted = await bcrypt.hash(userData.password, 10)
        
        const createUserData = await prisma.user.create({
            data:{
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                password: passwordEncrypted,
                role: userData.role || 'user',
                active: true,
            },
            omit:{
                password:true
            }
        })

        return createUserData;
    }

    static async login(email: string, password: string) {
   
        const findUser = await prisma.user.findUnique({where:{email}})
        if(!findUser) throw new HttpException(401, 'Invalid user or password')
         // ver si el password coincide
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect) throw new HttpException(401,'Invalid user or password')

        // generar el token de autenticación
        const token = jwt.sign(
            {colorFavorito:'azul', id:findUser.id, email:findUser.email, role:findUser.role}, 
            TOKEN_PASSWORD, 
            {expiresIn:"1h"}
        )
        // devolver el token y el usuario
        return {token, user: { id: findUser.id, email: findUser.email, role: findUser.role } }
    }

    static async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                role: true,
                active: true
            }
        });
        if (!user) throw new HttpException(404, 'User not found');
        return user;
    }
}