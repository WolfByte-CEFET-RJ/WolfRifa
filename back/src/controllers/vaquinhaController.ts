import type { Request, Response } from 'express';
import { ValidationError } from 'yup';
import { AppError } from '../utils/appError.js';
import { VaquinhaService } from '../services/vaquinhaService.js';
import { vaquinhaSchema } from '../yup/vaquinhayup.js';
import { updateVaquinhaRifaSchema } from '../yup/updateVaquinhaRifaYup.js';

export class VaquinhaController {
    static async create(req: Request, res: Response) {
        try {
            const userPublicId = req.user?.public_id;
            if (userPublicId === undefined) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            const dados = await vaquinhaSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            const resposta = await VaquinhaService.create(dados, String(userPublicId));

            return res.status(200).json(resposta);
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).json({
                    message: 'Campo inválido/obrigatório ausente',
                    errors: err.errors,
                });
            }

            if (err instanceof AppError) {
                return res.status(err.statusCode).json({
                    message: err.message,
                });
            }

            console.error(err);
            return res.status(500).json({
                message: 'Erro interno desconhecido do servidor',
            });
        }
    }

    static async list(_req: Request, res: Response) {
        try {
            const vaquinhas = await VaquinhaService.listAll();
            return res.status(200).json({ vaquinhas });
        } catch (err) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({
                    message: err.message,
                });
            }

            console.error(err);
            return res.status(500).json({
                message: 'Erro interno desconhecido do servidor',
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const publicId = req.params.public_id;
            console.log(publicId)
            
            if (typeof publicId !== 'string' || publicId.length === 0) {
                return res.status(400).json({
                    message: 'public_id da vaquinha inválido',
                });
            }

            const userPublicId = req.user?.public_id;
            console.log(userPublicId)
            if (userPublicId === undefined) {
                return res.status(401).json({
                    message: 'Token não informado',
                });
            }

            await VaquinhaService.delete(publicId, String(userPublicId));

            return res.status(200).json({
                success: true,
                message: 'Vaquinha removida com sucesso.',
            });
        } catch (err) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({
                    message: err.message,
                });
            }

            console.error(err);
            return res.status(500).json({
                message: 'Erro interno desconhecido do servidor',
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const publicId = req.params.public_id;
            if (typeof publicId !== 'string' || publicId.length === 0) {
                return res.status(400).json({ message: 'public_id da vaquinha inválido' });
            }

            const userPublicId = req.user?.public_id;
            if (userPublicId === undefined) {
                return res.status(401).json({ message: 'Token não informado' });
            }

            const dados = await updateVaquinhaRifaSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            const vaquinha = await VaquinhaService.update(publicId, userPublicId, dados);
            return res.status(200).json({ vaquinha });
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).json({ message: 'Dados inválidos', errors: err.errors });
            }
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({ message: 'Erro ao atualizar vaquinha.' });
        }
    }
}