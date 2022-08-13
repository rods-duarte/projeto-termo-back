import Joi from 'joi';

export interface Credentials {
  email: string;
  password: string;
}

const SigninSchema = Joi.object<Credentials>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { SigninSchema };
