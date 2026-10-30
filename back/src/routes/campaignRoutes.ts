import { Router } from 'express';
import { RaffleController } from '../controllers/raffleController.js';
import { VaquinhaController } from '../controllers/vaquinhaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const campaignRoutes = Router();
//rifa
campaignRoutes.patch('/campaign/rifa/:public_id', authMiddleware, RaffleController.update);

//vaquinha
campaignRoutes.post('/campaign/vaquinha', authMiddleware, VaquinhaController.create);
campaignRoutes.get('/campaign/vaquinha', VaquinhaController.list);
campaignRoutes.get('/campaign/vaquinhas/:public_id', VaquinhaController.getByPublicId);
campaignRoutes.get('/campaign/vaquinha/:public_id', VaquinhaController.getByPublicId);
campaignRoutes.delete('/campaign/vaquinha/:public_id', authMiddleware, VaquinhaController.delete);

export default campaignRoutes;
