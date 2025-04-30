import {
  FavoriteProductListAddProductService,
  FavoriteProductListCreateService,
  FavoriteProductListRemoveProductService,
  FavoriteProductListUpdateService,
} from './types';
import { IFavoriteProductList } from '../../models';
import { ConflictError, NotFoundError } from '../../utils';
import { AbstractFavoriteProductListRepository } from '../../repository/favoriteProductList/proxy';
import { AbstractFavoriteProductRepository } from '../../repository/favoriteProduct/proxy';

export class FavoriteProductListService {
  constructor(
    private favoriteProductListRepository: AbstractFavoriteProductListRepository,
    private favoriteProductRepository: AbstractFavoriteProductRepository
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

  async addProduct({
    user_id,
    product_id,
  }: FavoriteProductListAddProductService) {
    //TODO Should be a transaction
    const list = await this.get(user_id);
    console.log('Selected list:', list);

    if (!list || !list.id) {
      throw new NotFoundError('Lista inexistente');
    }

    if (this.hasProduct(list, product_id))
      throw new NotFoundError(
        'Não foi possivel adicionar, a lista já tem o produto'
      );

    if (list.favorite_products?.length === 5)
      throw new ConflictError(
        'Não foi possivel adicionar, a lista está cheia',
        'o limite de tamanho é 5 produtos'
      );

    const inserted = await this.favoriteProductRepository.insert({
      favorite_product_list_id: list.id,
      product_id,
    });

    if (inserted) {
      await this.favoriteProductListRepository.updateQuantity({
        id: list.id,
        increase: 1,
      });
    }

    return inserted;
  }

  private hasProduct(list: IFavoriteProductList | null, product_id: number) {
    if (
      list &&
      list.favorite_products &&
      list.favorite_products.includes(product_id)
    ) {
      return true;
    }

    return false;
  }

  async removeProduct({
    user_id,
    product_id,
  }: FavoriteProductListRemoveProductService) {
    //TODO Should be a transaction
    const list = await this.get(user_id);

    if (!list || !list.id) {
      throw new NotFoundError('Lista inexistente');
    }

    if (!this.hasProduct(list, product_id))
      throw new NotFoundError(
        'Não foi possivel aremover, a lista não contem o item'
      );

    const wasDeleted = await this.favoriteProductRepository.delete({
      favorite_product_list_id: list.id,
      product_id,
    });

    if (wasDeleted) {
      await this.favoriteProductListRepository.updateQuantity({
        id: list.id,
        increase: -1,
      });
    }

    return wasDeleted;
  }
}
