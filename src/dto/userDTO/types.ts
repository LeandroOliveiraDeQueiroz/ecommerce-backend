import Joi from 'joi';

export type TSigninSchema = Joi.ObjectSchema<{
  name: Joi.StringSchema<string>;
  email: Joi.StringSchema<string>;
  password: Joi.StringSchema<string>;
}>;

export type TLoginSchema = Joi.ObjectSchema<{
  email: Joi.StringSchema<string>;
  password: Joi.StringSchema<string>;
}>;
