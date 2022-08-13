import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database.js';
import { SignupData } from '../../src/models/SignupSchema.js';
import { app } from '../../src/app.js';
import { userFactory } from '../factories/userFactory.js';
import { Credentials } from '../../src/models/SigninSchema.js';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE USERS CASCADE`;
});

describe('authentication test suit', () => {
  describe('signup route tests', () => {
    it('given valid body should create user, expect 201', async () => {
      const signupData: SignupData = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'password',
        confirmPassword: 'password',
      };

      const response = await supertest(app).post('/signup').send(signupData);
      expect(response.statusCode).toBe(201);

      const userCreated = prisma.user.findUnique({
        where: {
          email: signupData.email,
        },
      });
      expect(userCreated).not.toBe(null);
    });

    it('given a registered email should not create, expect 401', async () => {
      const email = faker.internet.email();
      const signupData: SignupData = {
        username: faker.name.firstName(),
        email,
        password: 'password',
        confirmPassword: 'password',
      };
      await userFactory.createUser(email);

      const response = await supertest(app).post('/signup').send(signupData);
      expect(response.statusCode).toBe(401);
      expect(response.text).toBe('email already registered !');
    });

    it('given not matching password and confirmPassword should not create, expect 422', async () => {
      const signupData: SignupData = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'password',
        confirmPassword: '123',
      };

      const response = await supertest(app).post('/signup').send(signupData);
      expect(response.statusCode).toBe(422);

      const createdUser = await prisma.user.findUnique({
        where: {
          email: signupData.email,
        },
      });
      expect(createdUser).toBe(null);
    });
  });
  describe('signin route tests', () => {
    it('given valid email and password should return token, expect 200', async () => {
      const credentials: Credentials = {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
      };
      userFactory.createUser(credentials.email, credentials.password);

      const response = await supertest(app).post('/signin').send(credentials);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('given invalid email should not login, expect 401', async () => {
      const credentials: Credentials = {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
      };

      const response = await supertest(app).post('/signin').send(credentials);
      expect(response.statusCode).toBe(401);
      expect(response.body).not.toHaveProperty('token');
      expect(response.text).toBe('Wrong email & password combination !');
    });

    it('given wrong password should not login, expect 401', async () => {
      const credentials: Credentials = {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(9),
      };
      userFactory.createUser(credentials.email);

      const response = await supertest(app).post('/signin').send(credentials);
      expect(response.statusCode).toBe(401);
      expect(response.body).not.toHaveProperty('token');
      expect(response.text).toBe('Wrong email & password combination !');
    });
  });
});
