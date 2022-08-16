import { Router } from 'express';
import { updateUserStats } from '../controllers/userController.js';
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { UserStatsSchema } from '../models/userStatsSchema.js';

const userRouter = Router();

userRouter.post(
  '/users/:id',
  validateToken,
  validateSchema(UserStatsSchema),
  updateUserStats
);

export { userRouter };
