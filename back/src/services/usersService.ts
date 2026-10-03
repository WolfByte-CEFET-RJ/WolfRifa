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

    static async updateProfile(id: number, data: any) {
        const db = DatabaseConnection.getInstance();
        
        const updateData: any = { updated_at: new Date() };
        if (data.nome) updateData.name = data.nome;
        if (data.celular) updateData.phone_number = data.celular;

        if (Object.keys(updateData).length === 1) { // Only updated_at
            throw new AppError('Nenhum dado para atualizar', 400);
        }

        const [usuario] = await db<Usuario>('users')
            .where({ id })
            .update(updateData)
            .returning(['id', 'name', 'email', 'phone_number']);

        if (!usuario) {
            throw new AppError('Usuário não encontrado', 404);
        }

        return usuario;
    }
}