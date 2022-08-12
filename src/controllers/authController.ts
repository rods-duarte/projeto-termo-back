import { Request, Response } from 'express';
import * as userService from '../services/userService.js';
import { SignupData } from '../models/SignupSchema.js';

async function signup(req: Request, res: Response) {
  const signupData: SignupData = { ...req.body };
  delete signupData.confirmPassword;
  await userService.create(signupData);
  res.status(201).send('User created !');
}

async function signin(req: Request, res: Response) {
  // TODO verificar se o email enviado eh cadastrado, se nao 401
  // TODO verificar se a senha bate com o email enviado, se nao 401
  // TODO logar o usuario, retornar jsonwebtoken com exp um dia sepa
}

export { signup, signin };
