import { Router } from 'express';
import { RaffleController } from '../controllers/raffleController.js';
import { VaquinhaController } from '../controllers/vaquinhaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const campaignRoutes = Router();
//rifa
campaignRoutes.patch('/campaign/rifa/:public_id', authMiddleware, RaffleController.update);

//vaquinha
campaignRoutes.delete('/campaign/vaquinha/:public_id', authMiddleware, VaquinhaController.delete);

export default campaignRoutes;
