import { Router } from 'express';
import { UserController } from '../controllers/usersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRoutes = Router();

userRoutes.post('/api/auth/user/register', UserController.register);
userRoutes.put('/api/auth/user/perfil', authMiddleware, UserController.updateProfile);
userRoutes.put('/participante/alterar_cadastro', authMiddleware, UserController.updateProfile);

//exemplo de chamada de rota com autenticação
//userRoutes.get('/users/test', authMiddleware, UserController.teste);


export default userRoutes;
