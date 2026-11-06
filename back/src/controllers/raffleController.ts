import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError } from 'yup';
import { RaffleService } from '../services/raffleService.js';
import { raffleSchema } from '../yup/raffleYup.js';

export class RaffleController {
    static async create(req: Request, res: Response) {
        const secret = process.env.JWT_SECRET;
        if (!secret) return res.status(500).json({ message: 'Erro interno do servidor' });

        const authorization = req.headers.authorization;
        const match = authorization?.match(/^Bearer (\S+)$/);
        if (!match) return res.status(403).json({ message: 'Não autorizado' });

        let organizerPublicId: string;
        try {
            const payload = jwt.verify(match[1]!, secret, { algorithms: ['HS256'] });
            if (typeof payload === 'string' || !payload.sub || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(payload.sub)) {
                return res.status(403).json({ message: 'Não autorizado' });
            }
            organizerPublicId = payload.sub;
        } catch {
            return res.status(403).json({ message: 'Não autorizado' });
        }

        try {
            const input = await raffleSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
            const result = await RaffleService.create(input, organizerPublicId);
            if (!result) return res.status(403).json({ message: 'Não autorizado' });
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
            }
            console.error(error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
