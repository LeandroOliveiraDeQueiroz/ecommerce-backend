import client from '../db';
import { IProduct } from './Product';

export interface IFavoriteProduct {
  id: number;
  product_id: number;
  product?: IProduct;
  favorite_product_list_id: number;
}

export const createFavoriteProductTable = async () => {
  await client.query(`CREATE TABLE IF NOT EXISTS favorite_product (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        product_id INTEGER NOT NULL,
        favorite_product_list_id INTEGER NOT NULL,
        CONSTRAINT fk_list FOREIGN KEY(favorite_product_list_id) REFERENCES favorite_product_list(id) ON DELETE CASCADE
    );`);
};
