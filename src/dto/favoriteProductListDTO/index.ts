import Joi from 'joi';
import {
  TAddProductSchema,
  TCreateSchema,
  TDeleteSchema,
  TGetSchema,
  TRemoveProductSchema,
  TUpdateSchema,
} from './types';

export class FavoriteProductListDTO {
  static getCreateDTO(): TCreateSchema {
    return Joi.object().keys({
      user_id: Joi.number().required(),
      title: Joi.string().min(1).max(256).required(),
      description: Joi.string().allow(''),
    });
  }
  static getGetDTO(): TGetSchema {
    return Joi.object().keys({
      user_id: Joi.number().required(),
    });
  }
  static getUpdateDTO(): TUpdateSchema {
    return Joi.object().keys({
      user_id: Joi.number().required(),
      title: Joi.string().min(1).max(256).required(),
      description: Joi.string().allow(''),
    });
  }

  static getDeleteDTO(): TDeleteSchema {
    return Joi.object().keys({
      user_id: Joi.number().required(),
    });
  }

  static getAddProductDTO(): TAddProductSchema {
    return Joi.object().keys({
      user_id: Joi.number().required(),
      product_id: Joi.number().required(),
    });
  }

  static getRemoveProductPostDTO(): TRemoveProductSchema {
    return Joi.object().keys({
      user_id: Joi.number().required(),
      product_id: Joi.number().required(),
    });
  }
}
