import type { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { AppError } from '../utils/appError.js';
import { UserService } from '../services/usersService.js';
import { registerSchema, updateProfileSchema } from '../yup/userYup.js';

export class UserController {
    static async register(req: Request, res: Response) {
        try {
        const dados = await registerSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const usuario = await UserService.register(dados);

        return res.status(201).json({ usuario });
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


    static async updateProfile(req: Request, res: Response) {
        try {
            const dados = await updateProfileSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: 'Não autorizado' });
            }

            const usuario = await UserService.updateProfile(req.user.id, dados);

            const resposta = {
                Participante: {
                    id: usuario.id,
                    nome: usuario.name,
                    Celular: usuario.phone_number
                }
            };

            return res.status(200).json(resposta);
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