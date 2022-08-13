import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import { Credentials } from '../models/SigninSchema.js';
import { SignupData } from '../models/SignupSchema.js';
import { userRepository } from '../repositories/userRepository.js';

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

async function login(credentials: Credentials) {
  const { email, password } = credentials;
  const user = await userRepository.select(email);

  if (!user) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }

  const valid = bcrypt.compareSync(password, user.password);

  if (!valid) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }

  delete user.password;
  const payload = { ...user };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // one day
  });
  return token;
}

export const userService = { getByEmail, create, login };
