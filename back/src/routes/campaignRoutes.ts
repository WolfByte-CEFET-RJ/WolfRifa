import { Router } from 'express';
import { RaffleController } from '../controllers/raffleController.js';
import { VaquinhaController } from '../controllers/vaquinhaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const campaignRoutes = Router();

campaignRoutes.delete('/campaign/rifa/:id', authMiddleware, RaffleController.delete);
campaignRoutes.delete('/campaign/vaquinha/:id', authMiddleware, VaquinhaController.delete);

export default campaignRoutes;
