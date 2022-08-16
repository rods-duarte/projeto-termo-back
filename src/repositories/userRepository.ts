import { prisma } from '../database.js';
import { SignupData } from '../models/SignupSchema.js';
import { UserStats } from '../models/userStatsSchema.js';

async function select(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function insert(data: Omit<SignupData, 'confirmPassword'>) {
  await prisma.user.create({
    data,
  });
}

async function update(email: string, data: UserStats) {
  await prisma.user.update({
    where: {
      email,
    },
    data,
  });
}

export const userRepository = {
  select,
  insert,
  update,
};
