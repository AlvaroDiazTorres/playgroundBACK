import { Response, Request, NextFunction } from 'express';
import { prisma } from '../database/database';

export class EventoController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const eventos = await prisma.evento.findMany({
                include: {
                    artistas: true
                }
            });
            res.status(200).json(eventos);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const evento = await prisma.evento.findUnique({
                where: { id },
                include: {
                    artistas: true
                }
            });
            if (!evento) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).json(evento);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { ciudad, direccion, fecha, frontImage, backImage } = req.body;
            const evento = await prisma.evento.create({
                data: {
                    ciudad,
                    direccion,
                    fecha: new Date(fecha),
                    frontImage,
                    backImage,
                }
            });
            res.status(201).json(evento);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { ciudad, direccion, fecha, frontImage, backImage } = req.body;
            const evento = await prisma.evento.update({
                where: { id },
                data: {
                    ciudad,
                    direccion,
                    fecha: new Date(fecha),
                    frontImage,
                    backImage,
                }
            });
            res.status(200).json(evento);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await prisma.evento.delete({ where: { id } });
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
} 