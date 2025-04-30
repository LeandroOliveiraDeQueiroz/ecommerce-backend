import { FavoriteProductRepository } from '.';
import { DatabaseErrorMapper } from '../../utils/databaseErrorMapper/databaseErrorMapper';
import { TDeleteParams, TInsertParams } from './types';

export abstract class AbstractFavoriteProductRepository {
  abstract insert(params: TInsertParams): Promise<boolean>;
  abstract delete(params: TDeleteParams): Promise<boolean>;
}

export class FavoriteProductRepositoryErrorProxy
  implements AbstractFavoriteProductRepository
{
  constructor(private repo: FavoriteProductRepository) {}

  async insert(params: TInsertParams): Promise<boolean> {
    try {
      return await this.repo.insert(params);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }

  async delete(params: TDeleteParams): Promise<boolean> {
    try {
      return await this.repo.insert(params);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }
}
