import { Client } from 'pg';
import { TInsertParams, TDeleteParams } from './types';
import { AbstractFavoriteProductRepository } from './proxy';

export class FavoriteProductRepository
  implements AbstractFavoriteProductRepository
{
  constructor(private db: Client) {}

  async insert({
    favorite_product_list_id,
    product_id,
  }: TInsertParams): Promise<boolean> {
    const values = [favorite_product_list_id, product_id];
    console.log('values:', values);
    const res = await this.db.query(INSERT_FAVORITE_PRODUCT_QUERY, values);

    console.log('Response database:', res);
    console.log('res.rows[0]:', res.rows[0]);

    return res.rowCount !== null && res.rowCount >= 1;
  }

  async delete({
    favorite_product_list_id,
    product_id,
  }: TDeleteParams): Promise<boolean> {
    const values = [favorite_product_list_id, product_id];
    const res = await this.db.query(DELETE_FAVORITE_PRODUCT_QUERY, values);

    console.log('Response database:', res);

    return res.rowCount !== null && res.rowCount >= 1;
  }
}

const DELETE_FAVORITE_PRODUCT_QUERY = `
  DELETE 
  FROM favorite_product 
  WHERE favorite_product_list_id = $1 AND product_id = $2;
`;

const INSERT_FAVORITE_PRODUCT_QUERY = `
    INSERT INTO favorite_product (favorite_product_list_id, product_id) VALUES ($1, $2);`;
