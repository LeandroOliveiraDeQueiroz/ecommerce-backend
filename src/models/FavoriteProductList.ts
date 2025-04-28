import client from '../db';
import { IFavoriteProduct } from './FavoriteProduct';
import { IUser } from './User';

export interface IFavoriteProductList {
  id?: number;
  title: string;
  description?: string;
  product_quantity: number;
  favorite_products?: IFavoriteProduct[];
  user_id: number;
  user?: Pick<IUser, 'id'> & Omit<Partial<IUser>, 'id'>;
}

export const createFavoriteProductListTable = async () => {
  await client.query(`CREATE TABLE IF NOT EXISTS favorite_product_list (
        ID BIGSERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(128) NOT NULL,
        description VARCHAR(512),
        user_id INTEGER NOT NULL,
        product_quantity INTEGER default 0,
        UNIQUE(user_id),
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id)
    );`);
};
