import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { unprocessableEntityError } from './errorHandlerMiddleware.js';

function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('executou validate');
    const { body } = req;
    const { error } = schema.validate(body);
    console.log(
      '🚀 ~ file: validateSchemaMiddleware.ts ~ line 10 ~ return ~ error',
      error
    );
    const valid = error == null;

    if (!valid) {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      throw unprocessableEntityError(message);
    }

    next();
  };
}

export { validateSchema };
