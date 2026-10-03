import { Router } from 'express';
import { RaffleController } from '../controllers/raffleController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const campaignRoutes = Router();

campaignRoutes.patch('/campaign/rifa/:id', authMiddleware, RaffleController.update);

export default campaignRoutes;
