import { jest } from '@jest/globals'; // eslint-disable-line
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { userService } from '../../src/services/userService.js';
import { userRepository } from '../../src/repositories/userRepository.js';
import { unauthorizedError } from '../../src/middlewares/errorHandlerMiddleware.js';
import { SignupData } from '../../src/models/SignupSchema.js';
import { Credentials } from '../../src/models/SigninSchema.js';

afterEach(() => {
  jest.clearAllMocks();
});

describe('user service test suit', () => {
  describe('get user by id tests', () => {
    it('should return user', async () => {
      const user: User = {
        id: 1,
        email: faker.internet.email(),
        username: faker.name.firstName(),
        password: faker.random.alphaNumeric(10),
        bestStreak: 0,
        currentStreak: 1,
        losses: 2,
        wins: 3,
        score: 4,
      };
      jest.spyOn(userRepository, 'select').mockResolvedValueOnce(user);

      const userReturned = await userService.getByEmail(user.email);
      expect(userReturned).toBe(user);
    });
  });

  describe('create user tests', () => {
    it('given valid signup data should create user', async () => {
      const signupData: SignupData = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'password',
        confirmPassword: 'password',
      };
      jest.spyOn(userRepository, 'insert').mockResolvedValueOnce(null);
      jest.spyOn(userRepository, 'select').mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(null);

      await userService.create(signupData);
      expect(bcrypt.hashSync).toBeCalled();
      expect(userRepository.insert).toBeCalled();
    });

    it('given email already registered should throw error', async () => {
      const signupData: SignupData = {
        username: faker.name.firstName(),
        email: 'email@email.com',
        password: 'password',
        confirmPassword: '123',
      };
      const user: User = {
        id: 1,
        email: 'email@email.com',
        username: faker.name.firstName(),
        password: faker.random.alphaNumeric(10),
        bestStreak: 0,
        currentStreak: 1,
        losses: 2,
        wins: 3,
        score: 4,
      };
      jest.spyOn(userRepository, 'insert').mockResolvedValueOnce(null);
      jest.spyOn(userRepository, 'select').mockResolvedValueOnce(user);

      const promise = userService.create(signupData);
      expect(promise).rejects.toEqual(
        unauthorizedError('email already registered !')
      );
      expect(userRepository.insert).not.toBeCalled();
    });
  });

  describe('login tests', () => {
    it('given valid credentials should return token', async () => {
      const user: User = {
        id: 1,
        email: 'email@email.com',
        username: faker.name.firstName(),
        password: faker.random.alphaNumeric(10),
        bestStreak: 0,
        currentStreak: 1,
        losses: 2,
        wins: 3,
        score: 4,
      };
      const credentials: Credentials = {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
      };
      jest.spyOn(userRepository, 'select').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => true);

      const token = await userService.login(credentials);
      expect(token).not.toBe(null);
    });

    it('given invalid email should throw error', async () => {
      const credentials: Credentials = {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
      };
      jest.spyOn(userRepository, 'select').mockResolvedValueOnce(null);

      const promise = userService.login(credentials);
      expect(promise).rejects.toEqual(
        unauthorizedError('Wrong email & password combination !')
      );
    });

    it('given invalid password should throw error', async () => {
      const user: User = {
        id: 1,
        email: 'email@email.com',
        username: faker.name.firstName(),
        password: faker.random.alphaNumeric(10),
        bestStreak: 0,
        currentStreak: 1,
        losses: 2,
        wins: 3,
        score: 4,
      };
      const credentials: Credentials = {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
      };
      jest.spyOn(userRepository, 'select').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => false);

      const promise = userService.login(credentials);
      expect(promise).rejects.toEqual(
        unauthorizedError('Wrong email & password combination !')
      );
    });
  });
});
