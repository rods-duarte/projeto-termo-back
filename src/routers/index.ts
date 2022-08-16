import { Router } from 'express';
import { authRouter } from './authRouter.js';
import { gameRouter } from './gameRouter.js';
import { userRouter } from './userRouter.js';

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(gameRouter);

export { router };
