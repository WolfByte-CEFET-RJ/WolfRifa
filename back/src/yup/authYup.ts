import * as yup from 'yup';

export const authSchema = yup
    .object({
        email: yup
        .string()
        .trim()
        .lowercase()
        .email('E-mail inválido'),
        phone_number: yup
        .string()
        .transform((valor) =>
            typeof valor === 'string' ? valor.replace(/\D/g, '') : valor,
        )
        .matches(/^\d{10,13}$/, 'Celular inválido'),
        password: yup.string().required('A senha é obrigatória'),
    })
    .test(
        'email-ou-celular',
        'Informe o e-mail ou o celular',
        (valor) => Boolean(valor?.email || valor?.phone_number),
    );

export type AuthInput = yup.InferType<typeof authSchema>;