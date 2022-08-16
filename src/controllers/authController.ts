import { Request, Response } from 'express';
import { userService } from '../services/userService.js';
import { SignupData } from '../models/SignupSchema.js';
import { Credentials } from '../models/SigninSchema.js';

async function signup(req: Request, res: Response) {
  const signupData: SignupData = { ...req.body };
  delete signupData.confirmPassword;
  await userService.create(signupData);

  res.status(201).send('Created');
}

async function signin(req: Request, res: Response) {
  const credentials: Credentials = { ...req.body };
  const userData = await userService.login(credentials);
  res.status(200).send(userData);
}

export { signup, signin };
