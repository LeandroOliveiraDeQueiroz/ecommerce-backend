import { IFavoriteProductList } from '../../models';

export type TInsertParams = Pick<
  IFavoriteProductList,
  'title' | 'description' | 'user_id'
>;

export type TUpdateParams = Pick<
  IFavoriteProductList,
  'user_id' | 'title' | 'description'
>;

export type TUpdateQuantityParams = Pick<IFavoriteProductList, 'id'> & {
  increase: -1 | 1;
};

export type TDeleteParams = Pick<IFavoriteProductList, 'user_id'>;

export type TGetParams = Pick<IFavoriteProductList, 'user_id'>;
