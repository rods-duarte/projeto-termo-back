import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { UserStats } from '../models/userStatsSchema.js';
import { userService } from '../services/userService.js';

async function updateUserStats(req: Request, res: Response) {
  const stats: UserStats = { ...req.body };
  const user: User = { ...res.locals.user };
  userService.updateStats(user.email, stats);
}

export { updateUserStats };
