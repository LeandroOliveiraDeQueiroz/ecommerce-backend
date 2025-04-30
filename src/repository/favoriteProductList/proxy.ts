import { FavoriteProductListRepository } from '.';
import { IFavoriteProductList } from '../../models';
import { DatabaseErrorMapper } from '../../utils/databaseErrorMapper/databaseErrorMapper';
import {
  TDeleteParams,
  TGetParams,
  TInsertParams,
  TUpdateQuantityParams,
} from './types';

export abstract class AbstractFavoriteProductListRepository {
  abstract insert(params: TInsertParams): Promise<IFavoriteProductList>;
  abstract update(params: TInsertParams): Promise<boolean>;
  abstract updateQuantity(params: TUpdateQuantityParams): Promise<boolean>;
  abstract delete(params: TDeleteParams): Promise<IFavoriteProductList | null>;
  abstract getByUserId(
    params: TGetParams
  ): Promise<IFavoriteProductList | null>;
}

export class FavoriteProductListRepositoryErrorProxy
  implements AbstractFavoriteProductListRepository
{
  constructor(private repo: FavoriteProductListRepository) {}

  async insert(params: TInsertParams): Promise<IFavoriteProductList> {
    try {
      return await this.repo.insert(params);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }

  async update(params: TInsertParams): Promise<boolean> {
    try {
      return await this.repo.update(params);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }

  async updateQuantity(params: TUpdateQuantityParams): Promise<boolean> {
    try {
      return await this.repo.updateQuantity(params);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }

  async delete(params: TDeleteParams): Promise<IFavoriteProductList | null> {
    try {
      return await this.repo.delete(params);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }

  async getByUserId(params: TGetParams): Promise<IFavoriteProductList | null> {
    try {
      return await this.repo.getByUserId(params);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }
}
