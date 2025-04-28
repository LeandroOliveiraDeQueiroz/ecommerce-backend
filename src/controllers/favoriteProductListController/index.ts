import { Request, Response } from 'express';
import { FavoriteProductListService } from '../../services/favoriteProductList';
import {
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

    const { error, value } = this.createDTO.validate(
      data
    ) as ValidationResult<ICreateDTO>;

    if (error) {
      res.status(400).send();
      return;
    }

    try {
      const favoriteProductList = await this.favoriteProductListService.create(
        value
      );
      console.log('favoriteProductList:', favoriteProductList);

      res.status(200).send(favoriteProductList);
    } catch (error) {
      console.log('error', error);
      res.status(500).send();
    }
  }

  async get(req: IRequestToPassJWTPayload, res: Response) {
    console.log('payload:', req.jwtPayload);
    const data = { user_id: req.jwtPayload?.id };

    const { error, value } = this.getDTO.validate(
      data
    ) as ValidationResult<IGetDTO>;
    if (error) {
      res.status(400).send();
      return;
    }

    try {
      const { user_id } = value;
      const favoriteProductsList = await this.favoriteProductListService.get(
        user_id as number
      );

      console.log('favoriteProductsList:', favoriteProductsList);
      if (favoriteProductsList) {
        res.status(200).send(favoriteProductsList);
      } else {
        console.log('get', 'sem valor');
        res.status(200).send();
      }
    } catch (error) {
      console.log('error', error);
      res.status(500).send();
    }
  }

  async update(req: IRequestToPassJWTPayload, res: Response) {
    const data = { ...req.body, user_id: req.jwtPayload?.id };
    const { error, value } = this.updateDTO.validate(
      data
    ) as ValidationResult<IUpdateDTO>;
    if (error) {
      res.status(400).send();
      return;
    }

    try {
      console.log(await this.favoriteProductListService.update(value));
      res.status(200).send();
    } catch (error) {
      console.log('error', error);
      res.status(500).send();
    }
  }

  async delete(req: IRequestToPassJWTPayload, res: Response) {
    const data = { user_id: req.jwtPayload?.id };
    const { error, value } = this.deleteDTO.validate(
      data
    ) as ValidationResult<IDeleteDTO>;
    if (error) {
      res.status(400).send();
      return;
    }

    try {
      const { user_id } = value;
      const favoriteProductsList = await this.favoriteProductListService.delete(
        user_id
      );

      res.status(200).send(favoriteProductsList);
    } catch (error) {
      console.log('error', error);
      res.status(500).send();
    }
  }

  async addProduct(req: Request, res: Response) {
    const body = req.body;
    const { error } = this.addProductDTO.validate(body);
    if (error) {
      res.status(400).send();
      return;
    }

    try {
      // const list_id: number = body.list_id;
      // const product_id: number = body.product_id;
      // const favoriteProductsList = await this.favoriteProductListService.addPRodu(
      //   user_id
      // );

      res.status(200).send();
    } catch (error) {
      console.log('error', error);
      res.status(500).send();
    }
  }

  async removeProduct(req: Request, res: Response) {
    const body = req.body;
    const { error } = this.addProductDTO.validate(body);
    if (error) {
      res.status(400).send();
      return;
    }

    try {
      // const list_id: number = body.list_id;
      // const product_id: number = body.product_id;
      // const favoriteProductsList = await this.favoriteProductListService.addPRodu(
      //   user_id
      // );

      res.status(200).send();
    } catch (error) {
      console.log('error', error);
      res.status(500).send();
    }
  }
}
