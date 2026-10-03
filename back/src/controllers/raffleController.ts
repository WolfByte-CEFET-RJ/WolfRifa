import type { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { AppError } from '../utils/appError.js';
import { RaffleService } from '../services/raffleService.js';
import { updateRaffleSchema } from '../yup/raffleYup.js';

export class RaffleController {
    static async update(req: Request, res: Response) {
        try {
            const idParam = req.params.id;
            const id = Number(idParam);
            if (typeof idParam !== 'string' || !/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id <= 0) {
                return res.status(400).json({ message: 'ID da rifa inválido' });
            }

            const userId = req.user?.id;
            if (userId === undefined) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            const dados = await updateRaffleSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            const rifa = await RaffleService.update(id, userId, dados);
            return res.status(200).json({ rifa });
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).json({ message: 'Dados inválidos', errors: err.errors });
            }

            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }

            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
