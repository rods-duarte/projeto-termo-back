import Joi from 'joi';

export interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
})
  .with('confirmPassword', 'password')
  .with('password', 'confirmPassword');

export { SignupSchema };
