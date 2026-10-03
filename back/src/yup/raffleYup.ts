import * as yup from 'yup';

export const updateRaffleSchema = yup.object({
    name: yup.string().max(255, 'O nome deve ter no máximo 255 caracteres').optional(),
    description: yup.string().optional(),
    end_date: yup.date().typeError('A data de encerramento é inválida').optional(),
    award: yup.string().max(255, 'O prêmio deve ter no máximo 255 caracteres').optional(),
    local: yup.string().max(255, 'O local deve ter no máximo 255 caracteres').optional(),
});

export type UpdateRaffleInput = yup.InferType<typeof updateRaffleSchema>;
