import bcrypt from 'bcrypt';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import { AppError } from '../utils/appError.js';
import type { RegisterInput } from '../yup/userYup.js';
import type { Usuario } from '../interfaces/usuarioInterface.js';

const SALT_ROUNDS = 10;
//nao registra o celular ainda, vou ver ainda melhor maneira de tratar
export class UserService {
    static async register({ email, phone_number, password }: RegisterInput) {
        const db = DatabaseConnection.getInstance();
        const senhaHash = await bcrypt.hash(password, SALT_ROUNDS);

        const [usuario] = await db<Usuario>('users')
        .insert({  email, password: senhaHash })
        .onConflict('email')
        .ignore()
        .returning(['public_id', 'name', 'email']);

        if (!usuario) {
        throw new AppError('E-mail já cadastrado', 409);
        }

    return usuario;
    }
}