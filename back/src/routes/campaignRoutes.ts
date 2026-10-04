import { Router } from 'express';
import { RaffleController } from '../controllers/raffleController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const campaignRoutes = Router();

campaignRoutes.delete('/campaign/rifa/:id', authMiddleware, RaffleController.delete);

export default campaignRoutes;
