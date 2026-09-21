import * as yup from 'yup';

export const authSchema = yup
    .object({
        email: yup
        .string()
        .trim()
        .lowercase()
        .email('E-mail inválido'),
        celular: yup
        .string()
        .transform((valor) =>
            typeof valor === 'string' ? valor.replace(/\D/g, '') : valor,
        )
        .matches(/^\d{10,13}$/, 'Celular inválido'),
        senha: yup.string().required('A senha é obrigatória'),
    })
    .test(
        'email-ou-celular',
        'Informe o e-mail ou o celular',
        (valor) => Boolean(valor?.email || valor?.celular),
    );

export type AuthInput = yup.InferType<typeof authSchema>;