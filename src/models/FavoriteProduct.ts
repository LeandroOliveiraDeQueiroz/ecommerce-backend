import client from '../db';
import { IProduct } from './Product';

export interface IFavoriteProduct {
  id: number;
  product_id: number;
  product?: IProduct;
  favoriteProductList_id: number;
}

export const createFavoriteProductTable = async () => {
  await client.query(`CREATE TABLE IF NOT EXISTS favoriteProduct (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        product_id INTEGER NOT NULL,
        favoriteProductList_id INTEGER NOT NULL,
        CONSTRAINT fk_list FOREIGN KEY(favoriteProductList_id) REFERENCES favoriteProductList(id)
    );`);
};
