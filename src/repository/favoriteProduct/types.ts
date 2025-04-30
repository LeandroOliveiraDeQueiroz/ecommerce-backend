import { IFavoriteProduct } from '../../models';

export type TInsertParams = Pick<
  IFavoriteProduct,
  'product_id' | 'favorite_product_list_id'
>;

export type TDeleteParams = Pick<
  IFavoriteProduct,
  'favorite_product_list_id' | 'product_id'
>;
