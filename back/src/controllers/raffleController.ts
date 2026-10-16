import type { Request, Response } from 'express';
import { AppError } from '../utils/appError.js';
import { RaffleService } from '../services/raffleService.js';
import type { UpdateVaquinhaRifaDTO } from '../interfaces/vaquinhaRifaInterface.js';
import { updateVaquinhaRifaSchema } from '../yup/updateVaquinhaRifaYup.js';
import { ValidationError } from 'yup';


export class RaffleController {
    static async delete(req: Request, res: Response) {
        try {
            const publicId = req.params.public_id;
            if (typeof publicId !== 'string' || publicId.length === 0) {
                return res.status(400).json({ message: 'public_id da rifa inválido' });
            }

            const user = req.user;
            const userId = user && 'id' in user && typeof user.id === 'number'
                ? user.id
                : undefined;
            if (userId === undefined) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            await RaffleService.delete(publicId, userId);
            return res.status(200).json({ success: true, message: 'Rifa removida com sucesso.' });
        } catch (err) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }

            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
  
    static async update(
        req: Request,
        res: Response
    ) {
        try {
            const publicId = req.params.public_id;
            if (typeof publicId !== 'string' || publicId.length === 0) {
                return res.status(400).json({ message: 'public_id da rifa inválido' });
            }

            const user = req.user;
            const userId = user && 'id' in user && typeof user.id === 'number'
                ? user.id
                : undefined;
            if (userId === undefined) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            const dados = await updateVaquinhaRifaSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            const rifa = await RaffleService.update(publicId, userId, dados);
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
