import { Router } from 'express';
import { UserController } from '../controllers/usersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRoutes = Router();

userRoutes.post('/api/auth/user/register', UserController.register);




export default userRoutes;
