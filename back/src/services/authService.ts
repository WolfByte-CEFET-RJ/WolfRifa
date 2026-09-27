import bcrypt from 'bcrypt';
import "dotenv/config";
import jwt, { type SignOptions } from 'jsonwebtoken';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import type { AuthInput } from '../yup/authYup.js';
import type { Usuario } from '../interfaces/usuarioInterface.js';

const DUMMY_HASH = bcrypt.hashSync('senha-invalida', 10);

export class AuthService {
    static async login({ email, phone_number, password }: AuthInput) {
        const db = DatabaseConnection.getInstance();

        const filtro = email ? { email } : { phone_number: phone_number ?? '' };
        const usuario = await db<Usuario>('users').where(filtro).first();

        const senhaCorreta = await bcrypt.compare(password, usuario?.password ?? DUMMY_HASH);

        if (!usuario || !senhaCorreta) {
            return null;
        }

        const secret = process.env.JWT_SECRET;


        const token = jwt.sign({ sub: String(usuario.public_id) }, String(secret), {
            expiresIn: (process.env.JWT_EXPIRES_IN) as NonNullable<SignOptions['expiresIn']>,
        });

        return {
            token,
            usuario: { public_id: usuario.public_id, nome: usuario.nome, email: usuario.email, phone_number: usuario.phone_number },
        };
    }
}