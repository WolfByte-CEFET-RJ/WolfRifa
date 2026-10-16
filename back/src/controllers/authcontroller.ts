import type { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { AuthService } from '../services/authService.js';
import { authSchema } from '../yup/authYup.js';

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const dados = await authSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            const resultado = await AuthService.login(dados);
            if (!resultado) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
                }
            return res.status(200).json(resultado);
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).json({ message: 'Dados inválidos', errors: err.errors });
            }
            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
            }
    }
}