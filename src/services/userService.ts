import bcrypt from 'bcrypt';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import { SignupData } from '../models/SignupSchema.js';
import * as userRepository from '../repositories/userRepository.js';

async function getByEmail(email: string) {
  const user = await userRepository.select(email);
  return user;
}

async function create(signupData: Omit<SignupData, 'confirmPassword'>) {
  const userExists = await userRepository.select(signupData.email);

  if (userExists) {
    const message = 'email already registered !';
    throw unauthorizedError(message);
  }

  const hashedPassword = bcrypt.hashSync(signupData.password, 10);
  const data = { ...signupData, password: hashedPassword };

  const user = await userRepository.insert(data);
  return user;
}

export { getByEmail, create };
