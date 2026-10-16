import * as yup from 'yup';

export const registerSchema = yup.object({
    name: yup
    .string()
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

    email: yup
    .string()
    .trim()
    .lowercase()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),

    phone_number: yup
    .string()
    
    .transform((valor) => (typeof valor === 'string' ? valor.replace(/\D/g, '') : valor))
    .matches(/^\d{10,13}$/, 'Celular inválido')
    .required('O celular é obrigatório'),

    password: yup
    .string()
    .required('A senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/[a-z]/, 'A senha deve ter pelo menos uma letra minúscula')
    .matches(/[A-Z]/, 'A senha deve ter pelo menos uma letra maiúscula')
    .matches(/\d/, 'A senha deve ter pelo menos um número'),
});

export type RegisterInput = yup.InferType<typeof registerSchema>;