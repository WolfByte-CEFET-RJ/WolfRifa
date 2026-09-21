import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import db from '../database/connection';
import { getJwtSecret, JWT_EXPIRES_IN } from '../config/auth';
import type { AuthInput } from '../yup/authYup.js';
import type { Usuario } from '../interfaces/usuarioInterface.js';


const DUMMY_HASH = bcrypt.hashSync('senha-invalida', 10);

export class AuthService {
    static async login({ email, celular, senha }: AuthInput) {
        const usuario = await db<Usuario>('usuarios')
        .where(email ? { email } : { celular })
        .first();

        const senhaCorreta = await bcrypt.compare(senha, usuario?.senha ?? DUMMY_HASH);

        if (!usuario || !senhaCorreta) {
            return null;
        }

        const token = jwt.sign({ sub: String(usuario.id) }, getJwtSecret(), {
            algorithm: 'HS256',
            expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
        });

        return {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                celular: usuario.celular,
            },
        };
    }
}