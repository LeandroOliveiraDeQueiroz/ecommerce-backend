import { IUser } from '../../models';
import { Client } from 'pg';

export class UserRepository {
  private static insertQuery = `
    INSERT INTO "user"(name, email, password) VALUES ( $1, $2, $3);`;

  private static getQuery = `
    SELECT * FROM "user"`;

  constructor(private db: Client) {}

  async insert(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<boolean> {
    const values = [name, email, hashedPassword];
    const res = await this.db.query(UserRepository.insertQuery, values);

    console.log('Response database', res);

    return res.rowCount === 1;
  }

  async get(params: IWhereQueryParam[]) {
    console.log('params:', params);

    const whereQuery = this.createWhereQuery(params);
    const query: string =
      whereQuery !== ''
        ? `${UserRepository.getQuery} ${whereQuery};`
        : `${UserRepository.getQuery};`;
    const values = params.map(({ value }) => value);

    console.log('query:', query);
    console.log('values:', values);

    const res = await this.db.query(query, values);

    console.log('Response database:', res);

    const user: IUser | null =
      res.rowCount && res.rowCount >= 1 ? res.rows[0] : null;

    return user;
  }

  private createWhereQuery(params: IWhereQueryParam[]): string {
    if (params.length === 0) return '';
    const queryBuilder = ['WHERE'];

    params.forEach(({ field }, index) => {
      queryBuilder.push(`${field} = $${index + 1}`);
    });

    return queryBuilder.join(' ');
  }
}

interface IWhereQueryParam {
  field: string;
  value: string | number;
}
