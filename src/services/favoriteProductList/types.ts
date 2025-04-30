export interface FavoriteProductListCreateService {
  user_id: number;
  title: string;
  description: string;
}

export interface FavoriteProductListUpdateService {
  user_id: number;
  title: string;
  description: string;
}

export interface FavoriteProductListAddProductService {
  user_id: number;
  product_id: number;
}

export interface FavoriteProductListRemoveProductService {
  user_id: number;
  product_id: number;
}
