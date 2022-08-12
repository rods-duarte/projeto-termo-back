import { Router } from 'express';
// middlewares
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
// controllers
import { signup } from '../controllers/authController.js';
// schemas
import { SignupSchema } from '../models/SignupSchema.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(SignupSchema), signup);
authRouter.post('/signin');

export { authRouter };
