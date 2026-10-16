import { Router } from 'express';
import { VaquinhaController } from '../controllers/vaquinhaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const vaquinhaRoutes = Router();

// Endpoint oficial conforme Documentação da API (Item 8 e 9)
vaquinhaRoutes.post('/campaign/vaquinha', authMiddleware, VaquinhaController.create);
vaquinhaRoutes.get('/campaign/vaquinha', VaquinhaController.list);

// Rota alternativa / alias
vaquinhaRoutes.post('/api/vaquinhas', authMiddleware, VaquinhaController.create);
vaquinhaRoutes.get('/api/vaquinhas', VaquinhaController.list);

export default vaquinhaRoutes;
