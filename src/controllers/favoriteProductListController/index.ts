import { Response } from 'express';
import { FavoriteProductListService } from '../../services/favoriteProductList';
import {
  IAddProductDTO,
  ICreateDTO,
  IDeleteDTO,
  IGetDTO,
  IUpdateDTO,
  TAddProductSchema,
  TCreateSchema,
  TDeleteSchema,
  TGetSchema,
  TRemoveProductSchema,
  TUpdateSchema,
} from '../../dto/favoriteProductListDTO/types';
import { IRequestToPassJWTPayload } from '../../shared-types';
import { ValidationResult } from 'joi';
import { ApiError, BadRequestError } from '../../utils';

export class FavoriteProductListController {
  constructor(
    private favoriteProductListService: FavoriteProductListService,
    private createDTO: TCreateSchema,
    private getDTO: TGetSchema,
    private updateDTO: TUpdateSchema,
    private deleteDTO: TDeleteSchema,
    private addProductDTO: TAddProductSchema,
    private removeProductDTO: TRemoveProductSchema
  ) {}

  async create(req: IRequestToPassJWTPayload, res: Response) {
    const data = { ...req.body, user_id: req.jwtPayload?.id };

    try {
      const { error, value } = this.createDTO.validate(
        data
      ) as ValidationResult<ICreateDTO>;

      if (error) {
        throw new BadRequestError('Campos invalidos');
      }

      const favoriteProductList = await this.favoriteProductListService.create(
        value
      );

      res.status(200).send(favoriteProductList);
    } catch (error) {
      const apiError = ApiError.handleError(error);
      const { statusCode, message } = apiError;
      res.status(statusCode).send(message);
    }
  }

  async get(req: IRequestToPassJWTPayload, res: Response) {
    const data = { user_id: req.jwtPayload?.id };

    try {
      const { error, value } = this.getDTO.validate(
        data
      ) as ValidationResult<IGetDTO>;

      if (error) {
        throw new BadRequestError('Campos invalidos');
      }

      const { user_id } = value;
      const favoriteProductsList = await this.favoriteProductListService.get(
        user_id as number
      );

      if (favoriteProductsList) {
        res.status(200).send(favoriteProductsList);
      } else {
        res.status(200).send();
      }
    } catch (error) {
      const apiError = ApiError.handleError(error);
      const { statusCode, message } = apiError;
      res.status(statusCode).send(message);
    }
  }

  async update(req: IRequestToPassJWTPayload, res: Response) {
    const data = { ...req.body, user_id: req.jwtPayload?.id };

    try {
      const { error, value } = this.updateDTO.validate(
        data
      ) as ValidationResult<IUpdateDTO>;

      if (error) {
        throw new BadRequestError('Campos invalidos');
      }

      await this.favoriteProductListService.update(value);
      res.status(200).send();
    } catch (error) {
      const apiError = ApiError.handleError(error);
      const { statusCode, message } = apiError;

      res.status(statusCode).send(message);
    }
  }

  async delete(req: IRequestToPassJWTPayload, res: Response) {
    const data = { user_id: req.jwtPayload?.id };

    try {
      const { error, value } = this.deleteDTO.validate(
        data
      ) as ValidationResult<IDeleteDTO>;

      if (error) {
        throw new BadRequestError('Campos invalidos');
      }

      const { user_id } = value;
      const favoriteProductsList = await this.favoriteProductListService.delete(
        user_id
      );

      res.status(200).send(favoriteProductsList);
    } catch (error) {
      const apiError = ApiError.handleError(error);
      const { statusCode, message } = apiError;
      res.status(statusCode).send(message);
    }
  }

  async addProduct(req: IRequestToPassJWTPayload, res: Response) {
    const data = { ...req.body, user_id: req.jwtPayload?.id };

    try {
      const { error, value } = this.addProductDTO.validate(
        data
      ) as ValidationResult<IAddProductDTO>;

      if (error) {
        throw new BadRequestError('Campos invalidos');
      }

      const { product_id, user_id } = value;
      const favoriteProductsList =
        await this.favoriteProductListService.addProduct({
          product_id,
          user_id,
        });

      if (favoriteProductsList) {
        res.status(200).send();
      } else {
        throw new Error();
      }
    } catch (error) {
      const apiError = ApiError.handleError(error);
      const { statusCode, message } = apiError;
      res.status(statusCode).send(message);
    }
  }

  async removeProduct(req: IRequestToPassJWTPayload, res: Response) {
    const data = { ...req.body, user_id: req.jwtPayload?.id };

    try {
      const { error, value } = this.removeProductDTO.validate(
        data
      ) as ValidationResult<IAddProductDTO>;

      if (error) {
        throw new BadRequestError('Campos invalidos');
      }

      const { product_id, user_id } = value;
      const favoriteProductsList =
        await this.favoriteProductListService.removeProduct({
          product_id,
          user_id,
        });

      if (favoriteProductsList) {
        res.status(200).send();
      } else {
        throw new Error();
      }
    } catch (error) {
      const apiError = ApiError.handleError(error);
      const { statusCode, message } = apiError;
      res.status(statusCode).send(message);
    }
  }
}
