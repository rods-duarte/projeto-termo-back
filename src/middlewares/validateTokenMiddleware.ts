import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorizedError } from './errorHandlerMiddleware.js';

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers?.authorization?.replace('Bearer ', '').trim();

  if (!token) {
    const message = 'Missing token !';
    throw unauthorizedError(message);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET) as User;
    res.locals.user = user;
    next();
  } catch (err) {
    const message = 'Invalid token !';
    throw unauthorizedError(message);
  }
}

export { validateToken };
