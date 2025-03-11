import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Character, PrismaClient, User } from "@prisma/client";
//const prisma = new PrismaClient()

export class CharacterService {
  static async getById(id: number) {
    const findCharacter = await prisma.character.findUnique({ where: { id } });
    if (!findCharacter) throw new HttpException(404, "Character not found");
    return findCharacter;
  }

  // localhost:3000/api/character/?name=faeq
  static async getAll(name: string = "") {
    return await prisma.character.findMany({
            where: name ? {
                name: {
                    contains: name
                }
            } : {},
            orderBy: {
                id: 'asc'
            },
            take: 100
        })
  }

  static async create(idUser: number, character: Character) {
    console.log("creando", idUser);
    return await prisma.character.create({
      data: {
        ...character,
        idUserAuthor: Number.isInteger(idUser) ? idUser : parseInt(String(idUser), 10),
      },
    });
  }

  static async update(id: number, character: Character) {
    const findCharacter = await prisma.character.findUnique({ where: { id } });
    if (!findCharacter) throw new HttpException(404, "Charancter doesnt exists");
    return await prisma.character.update({
      where: { id },
      data: {
        ...character,
      },
    });
  }

  static async delete(id: number) {
    try {
      return await prisma.character.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(404, "Character not found");
    }
  }

  static async getMyCharacter(idUser: number, idCharacter: number) {
    return await prisma.character.findUnique({
     where: { id:idCharacter, idUserAuthor:idUser }, //?
    });
  }
}
