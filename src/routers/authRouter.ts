import { Router } from 'express';
// middlewares
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
// controllers
import { signup, signin } from '../controllers/authController.js';
// schemas
import { SignupSchema } from '../models/SignupSchema.js';
import { SigninSchema } from '../models/SigninSchema.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(SignupSchema), signup);
authRouter.post('/signin', validateSchema(SigninSchema), signin);

export { authRouter };
