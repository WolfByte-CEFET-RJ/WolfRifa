import { Router } from 'express';
import { AuthController } from '../controllers/authcontroller.js';

const authRoutes = Router();

authRoutes.post('/auth/login', AuthController.login);

export default authRoutes;