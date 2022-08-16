import { Request, Response } from 'express';
import * as gameService from '../services/gameService.js';

async function getGameData(req: Request, res: Response) {
  const data = gameService.generateGameData();
  res.status(200).send({ data });
}

export { getGameData };
