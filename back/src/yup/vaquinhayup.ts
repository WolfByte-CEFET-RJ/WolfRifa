import * as yup from 'yup';

export const vaquinhaSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(2, 'O nome da campanha deve ter pelo menos 2 caracteres')
        .max(255, 'O nome deve ter no máximo 255 caracteres')
        .required('O nome da campanha é obrigatório'),

    description: yup
        .string()
        .trim()
        .nullable()
        .default(null),

    visibility: yup
        .string()
        .trim()
        .oneOf(['publica', 'privada', 'pública'], 'A visibilidade deve ser "publica" ou "privada"')
        .required('A visibilidade é obrigatória'),

    pix_key: yup
        .string()
        .trim()
        .max(255, 'A chave PIX deve ter no máximo 255 caracteres')
        .required('A chave PIX é obrigatória'),

    start_date: yup
        .string()
        .trim()
        .required('A data de início é obrigatória'),

    end_date: yup
        .string()
        .trim()
        .required('A data de encerramento da vaquinha é obrigatória'),

    amount_collected: yup
        .number()
        .min(0, 'A meta financeira não pode ser negativa')
        .required('A meta de arrecadação financeira (amount_collected) é obrigatória'),

    category: yup
        .string()
        .trim()
        .max(20, 'A categoria deve ter no máximo 20 caracteres')
        .required('A categoria da campanha é obrigatória'),

    social_networks: yup
        .array()
        .of(
            yup.object({
                platform: yup
                    .string()
                    .oneOf(['instagram', 'facebook', 'tiktok', 'youtube', 'x', 'other'], 'Plataforma inválida')
                    .required('A plataforma é obrigatória'),
                url: yup
                    .string()
                    .trim()
                    .required('A URL da rede social é obrigatória'),
            })
        )
        .optional(),
});

export type VaquinhaInput = yup.InferType<typeof vaquinhaSchema>;
