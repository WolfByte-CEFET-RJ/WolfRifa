import * as yup from 'yup';

const date = () => yup.string().required().test('date', 'Data inválida; use YYYY-MM-DD', value => {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
});

export const raffleSchema = yup.object({
    name: yup.string().trim().max(255).required(),
    description: yup.string().trim().optional(),
    visibility: yup.string().oneOf(['public', 'private']).required(),
    key_pix: yup.string().trim().max(255).required(),
    start_date: date(),
    end_date: date().test('order', 'A data final deve ser igual ou posterior à inicial', function (value) {
        return !value || !this.parent.start_date || value >= this.parent.start_date;
    }),
    award: yup.string().trim().max(255).required(),
    local: yup.string().trim().max(255).required(),
    participants_qtd: yup.number().strict().integer().min(1).max(2147483647).required(),
    social_networks: yup.array().of(yup.object({
        platform: yup.string().oneOf(['instagram', 'facebook', 'tiktok', 'youtube', 'x', 'other']).required(),
        url: yup.string().url().matches(/^https?:\/\//, 'Use uma URL HTTP ou HTTPS').required(),
    }).required()).optional(),
}).required();

export type CreateRaffleInput = yup.InferType<typeof raffleSchema>;
