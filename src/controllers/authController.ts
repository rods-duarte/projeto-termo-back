import { Request, Response } from 'express';
import * as userService from '../services/userService.js';
import { SignupData } from '../models/SignupSchema.js';
import { Credentials } from '../models/SigninSchema.js';

async function signup(req: Request, res: Response) {
  const signupData: SignupData = { ...req.body };
  delete signupData.confirmPassword;
  await userService.create(signupData);
  res.status(201).send('User created !');
}

async function signin(req: Request, res: Response) {
  const credentials: Credentials = { ...req.body };
  const token = await userService.login(credentials);
  res.status(200).send({ token });
}

export { signup, signin };
