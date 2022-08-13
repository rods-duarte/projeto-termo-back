import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { prisma } from '../../src/database.js';

async function createUser(
  email = faker.internet.email(),
  password = faker.random.alphaNumeric(10),
  username = faker.name.firstName()
) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  await prisma.user.create({
    data: { email, password: hashedPassword, username },
  });
}

export const userFactory = {
  createUser,
};
