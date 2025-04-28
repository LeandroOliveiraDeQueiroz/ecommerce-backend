import { FavoriteProductListRepository } from '../../repository/favoriteProductList';
import {
  FavoriteProductListCreateService,
  FavoriteProductListUpdateService,
} from './types';
export class FavoriteProductListService {
  constructor(
    private favoriteProductListRepository: FavoriteProductListRepository
  ) {}

  async create({
    user_id,
    title,
    description,
  }: FavoriteProductListCreateService) {
    return this.favoriteProductListRepository.insert({
      user_id,
      title,
      description,
    });
  }

  async get(user_id: number) {
    return await this.favoriteProductListRepository.getByUserId({ user_id });
  }

  async update({
    description,
    title,
    user_id,
  }: FavoriteProductListUpdateService) {
    return await this.favoriteProductListRepository.update({
      user_id,
      title,
      description,
    });
  }

  async delete(user_id: number) {
    return await this.favoriteProductListRepository.delete({
      user_id,
    });
  }
}
