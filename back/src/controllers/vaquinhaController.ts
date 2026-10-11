import type { Request, Response } from 'express';
import { AppError } from '../utils/appError.js';
import { VaquinhaService } from '../services/vaquinhaService.js';

export class VaquinhaController {
    static async delete(req: Request, res: Response) {
        try {
            const idParam = req.params.id;
            const id = Number(idParam);
            if (typeof idParam !== 'string' || !/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id <= 0) {
                return res.status(400).json({ message: 'ID da vaquinha inválido' });
            }

            const userId = req.user?.id;
            if (userId === undefined) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            await VaquinhaService.delete(id, userId);
            return res.status(200).json({ success: true, message: 'Vaquinha removida com sucesso.' });
        } catch (err) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }

            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
