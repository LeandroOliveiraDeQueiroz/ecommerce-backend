import { IFavoriteProductList } from '../../models';
import { Client } from 'pg';
import {
  TInsertParams,
  TUpdateParams,
  TDeleteParams,
  TGetParams,
  TUpdateQuantityParams,
} from './types';
import { AbstractFavoriteProductListRepository } from './proxy';

export class FavoriteProductListRepository
  implements AbstractFavoriteProductListRepository
{
  constructor(private db: Client) {}

  async insert({
    title,
    description,
    user_id,
  }: TInsertParams): Promise<IFavoriteProductList> {
    const values = [title, description, user_id];
    const res = await this.db.query(INSERT_FAVORITE_PRODUCTS_QUERY, values);

    return res.rows[0] as IFavoriteProductList;
  }

  async update({ user_id, title, description }: TUpdateParams) {
    const res = await this.db.query(UPDATE_FAVORITE_PRODUCTS_QUERY, [
      title,
      description,
      user_id,
    ]);

    const favoriteProductList: boolean | null =
      res.rowCount && res.rowCount >= 1 ? true : false;

    return favoriteProductList;
  }

  async updateQuantity({ id, increase }: TUpdateQuantityParams) {
    const values = [increase, id];
    const res = await this.db.query(
      UPDATE_FAVORITE_PRODUCTS_QUANTITY_QUERY,
      values
    );

    const favoriteProductList: boolean | null =
      res.rowCount && res.rowCount >= 1 ? true : false;

    return favoriteProductList;
  }

  async delete({ user_id }: TDeleteParams) {
    const res = await this.db.query(DELETE_FAVORITE_PRODUCTS_QUERY, [user_id]);

    const favoriteProductList: IFavoriteProductList | null =
      res.rowCount && res.rowCount >= 1 ? res.rows[0] : null;

    return favoriteProductList;
  }

  async getByUserId({ user_id }: TGetParams) {
    const res = await this.db.query(GET_FAVORITE_PRODUCTS_QUERY, [user_id]);

    const favoriteProductList: IFavoriteProductList | null =
      res.rowCount && res.rowCount >= 1 ? res.rows[0] : null;

    return favoriteProductList;
  }
}

const DELETE_FAVORITE_PRODUCTS_QUERY = `
  DELETE 
  FROM favorite_product_list 
  WHERE user_id = $1;
`;

const UPDATE_FAVORITE_PRODUCTS_QUERY = `
  UPDATE favorite_product_list 
  SET title= $1, 
      description = $2
  WHERE user_id = $3;
`;

const UPDATE_FAVORITE_PRODUCTS_QUANTITY_QUERY = `
  UPDATE favorite_product_list 
  SET product_quantity = product_quantity + $1
  WHERE id = $2;
`;

const INSERT_FAVORITE_PRODUCTS_QUERY = `
    INSERT INTO favorite_product_list (title, description, user_id) VALUES ($1, $2, $3);`;

const GET_FAVORITE_PRODUCTS_QUERY = `
      SELECT
          fl.id AS id,
          fl.title AS title,
          fl.description AS description,
          fl.product_quantity as product_quantity,
          CASE
              WHEN COUNT(fp.id) > 0 THEN json_agg(fp.product_id)
              ELSE '[]'::json
          END AS favorite_products
      FROM
          favorite_product_list AS fl
      LEFT JOIN
          favorite_product fp ON fl.id = fp.favorite_product_list_id
      WHERE
          fl.user_id = $1
      GROUP BY fl.id;
  `;
