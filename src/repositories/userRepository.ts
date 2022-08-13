import { prisma } from '../database.js';
import { SignupData } from '../models/SignupSchema.js';

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

export const userRepository = {
  select,
  insert,
};
