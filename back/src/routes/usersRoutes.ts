import { Router } from 'express';
import { UserController } from '../controllers/usersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRoutes = Router();

userRoutes.post('/api/auth/user/register', UserController.register);

//exemplo de chamada de rota com autenticação
userRoutes.get('/users/test', authMiddleware, UserController.teste);


export default userRoutes;
