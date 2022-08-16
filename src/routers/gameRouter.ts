import { Router } from 'express';
import { getGameData } from '../controllers/gameController.js';

const gameRouter = Router();

gameRouter.get('/game', getGameData);

export { gameRouter };
