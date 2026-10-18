import { Router } from 'express';
import { VaquinhaController } from '../controllers/vaquinhaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const vaquinhaRoutes = Router();

// Endpoint oficial conforme Documentação da API (Item 8 e 9)



export default vaquinhaRoutes;
