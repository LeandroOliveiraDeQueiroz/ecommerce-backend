import client from '../db';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export const createUserTable = async () => {
  await client.query(`CREATE TABLE IF NOT EXISTS "user" (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(256) NOT NULL,
        email VARCHAR(256) NOT NULL,
        password VARCHAR(256) NOT NULL,
        UNIQUE(email)
    );`);
};
