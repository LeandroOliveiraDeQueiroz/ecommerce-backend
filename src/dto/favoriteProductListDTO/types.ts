import Joi from 'joi';

export type TCreateSchema = Joi.ObjectSchema<{
  user_id: Joi.StringSchema<number>;
  title: Joi.StringSchema<string>;
  description: Joi.StringSchema<string>;
}>;

export interface ICreateDTO {
  user_id: number;
  title: string;
  description: string;
}

export type TGetSchema = Joi.ObjectSchema<{
  user_id: Joi.StringSchema<number>;
}>;

export interface IGetDTO {
  user_id: number;
}

export type TUpdateSchema = Joi.ObjectSchema<{
  user_id: Joi.StringSchema<number>;
  title: Joi.StringSchema<string>;
  description: Joi.StringSchema<string>;
}>;

export interface IUpdateDTO {
  user_id: number;
  title: string;
  description: string;
}

export type TDeleteSchema = Joi.ObjectSchema<{
  user_id: Joi.StringSchema<number>;
}>;

export interface IDeleteDTO {
  user_id: number;
}

export type TAddProductSchema = Joi.ObjectSchema<{
  list_id: Joi.StringSchema<number>;
  product_id: Joi.StringSchema<number>;
}>;

export type TRemoveProductSchema = Joi.ObjectSchema<{
  list_id: Joi.StringSchema<number>;
  product_id: Joi.StringSchema<number>;
}>;
