import type { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { AppError } from '../utils/appError.js';
import { VaquinhaService } from '../services/vaquinhaService.js';
import { vaquinhaSchema } from '../yup/vaquinhayup.js';

export class VaquinhaController {
    static async create(req: Request, res: Response) {
        try {
            const organizerId = req.user?.id ?? (req.body.organizer_id ? Number(req.body.organizer_id) : undefined);

            if (!organizerId || isNaN(organizerId)) {
                return res.status(403).json({ message: 'Não autorizado' });
            }

            const dados = await vaquinhaSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            const resposta = await VaquinhaService.create({
                ...dados,
                organizer_id: organizerId,
            });

            return res.status(200).json(resposta);
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).json({ message: 'Campo inválido/obrigatório ausente', errors: err.errors });
            }

            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }

            console.error(err);
            return res.status(500).json({ message: 'Erro interno desconhecido do servidor' });
        }
    }

    static async list(_req: Request, res: Response) {
        try {
            const vaquinhas = await VaquinhaService.listAll();
            return res.status(200).json({ vaquinhas });
        } catch (err) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }

            console.error(err);
            return res.status(500).json({ message: 'Erro interno desconhecido do servidor' });
        }
    }
}
