import { Router } from 'express';
import { RaffleController } from '../controllers/raffleController.js';

const raffleRoutes = Router();
raffleRoutes.post('/campaign/rifa', RaffleController.create);
export default raffleRoutes;
