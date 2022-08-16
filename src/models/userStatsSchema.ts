import Joi from 'joi';
import { User } from '@prisma/client';

export type UserStats = Partial<
  Omit<User, 'id' | 'username' | 'email' | 'password'>
>;

const UserStatsSchema = Joi.object<UserStats>({
  wins: Joi.number().min(0),
  losses: Joi.number().min(0),
  currentStreak: Joi.number().min(0),
  bestStreak: Joi.number().min(0),
  oneGuess: Joi.number().min(0),
  twoGuess: Joi.number().min(0),
  threeGuess: Joi.number().min(0),
  fourGuess: Joi.number().min(0),
  fiveGuess: Joi.number().min(0),
  sixGuess: Joi.number().min(0),
});

export { UserStatsSchema };
