import { ErrorRequestHandler } from 'express';

interface ErrorObject {
  type:
    | 'unauthorized'
    | 'forbidden'
    | 'notFound'
    | 'conflict'
    | 'unprocessableEntity';
  message: string;
}

const serviceErrorToStatusCode = {
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  unprocessableEntity: 422,
};

function unauthorizedError(message: string): ErrorObject {
  return { type: 'unauthorized', message };
}

function forbiddenError(message: string): ErrorObject {
  return { type: 'forbidden', message };
}

function notFoundError(message: string): ErrorObject {
  return { type: 'notFound', message };
}

function conflictError(message: string): ErrorObject {
  return { type: 'conflict', message };
}

function unprocessableEntityError(message: string): ErrorObject {
  return { type: 'unprocessableEntity', message };
}

// eslint-disable-next-line
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const { type, message } = error as ErrorObject;

  if (type) {
    return res.status(serviceErrorToStatusCode[type]).send(message);
  }

  return res.status(500).send('Internal server error !');
};

export {
  errorHandler,
  unauthorizedError,
  forbiddenError,
  notFoundError,
  conflictError,
  unprocessableEntityError,
};
