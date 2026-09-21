import bcrypt from 'bcrypt';
import "dotenv/config";
import jwt, { type SignOptions } from 'jsonwebtoken';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import type { AuthInput } from '../yup/authYup.js';
import type { Usuario } from '../interfaces/usuarioInterface.js';

const DUMMY_HASH = bcrypt.hashSync('senha-invalida', 10);

export class AuthService {
    static async login({ email, celular, senha }: AuthInput) {
        const db = DatabaseConnection.getInstance();

        const filtro = email ? { email } : { celular: celular ?? '' };
        const usuario = await db<Usuario>('usuarios').where(filtro).first();

        const senhaCorreta = await bcrypt.compare(senha, usuario?.senha ?? DUMMY_HASH);

        if (!usuario || !senhaCorreta) {
            return null;
        }

        const secret = process.env.JWT_SECRET;


        const token = jwt.sign({ sub: String(usuario.public_id) }, String(secret), {
            expiresIn: (process.env.JWT_EXPIRES_IN ?? '1d') as NonNullable<SignOptions['expiresIn']>,
        });

        return {
            token,
            usuario: { public_id: usuario.public_id, nome: usuario.nome, email: usuario.email, celular: usuario.celular },
        };
    }
}