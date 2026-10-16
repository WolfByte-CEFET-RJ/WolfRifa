import type { RequestHandler } from 'express';
import * as yup from 'yup';

export const updateVaquinhaRifaSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(2, 'O nome deve ter pelo menos 2 caracteres')
        .max(255, 'O nome deve ter no máximo 255 caracteres')
        .optional(),
    description: yup.string().trim().nullable().optional(),
    visibility: yup
        .string()
        .trim()
        .oneOf(['publica', 'privada', 'pública'], 'A visibilidade deve ser "publica" ou "privada"')
        .optional(),
    pix_key: yup.string().trim().max(255, 'A chave PIX deve ter no máximo 255 caracteres').optional(),
    start_date: yup.date().typeError('A data de início é inválida').optional(),
    end_date: yup.date().typeError('A data de encerramento é inválida').optional(),
    amount_collected: yup
        .number()
        .typeError('A meta financeira deve ser um número')
        .min(0, 'A meta financeira não pode ser negativa')
        .optional(),
    category: yup.string().trim().max(20, 'A categoria deve ter no máximo 20 caracteres').optional(),
    social_networks: yup
        .array()
        .of(
            yup
                .object({
                    platform: yup
                        .string()
                        .oneOf(['instagram', 'facebook', 'tiktok', 'youtube', 'x', 'other'], 'Plataforma inválida')
                        .required('A plataforma é obrigatória'),
                    url: yup.string().trim().required('A URL da rede social é obrigatória'),
                })
                .required()
        )
        .optional(),
    award: yup.string().trim().max(255, 'O prêmio deve ter no máximo 255 caracteres').optional(),
    local: yup.string().trim().max(255, 'O local deve ter no máximo 255 caracteres').optional(),
});

export type UpdateVaquinhaRifaInput = yup.InferType<typeof updateVaquinhaRifaSchema>;

export const validateUpdateVaquinhaRifa: RequestHandler = async (req, res, next) => {
    try {
        req.body = await updateVaquinhaRifaSchema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false,
        });
        next();
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                message: 'Dados inválidos',
                errors: error.errors,
            });
            return;
        }

        next(error);
    }
};
