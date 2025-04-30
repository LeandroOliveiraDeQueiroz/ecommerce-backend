import { IUser } from '../../models';
import { UserRepository } from '.';
import { DatabaseErrorMapper } from '../../utils/databaseErrorMapper/databaseErrorMapper';

interface IWhereQueryParam {
  field: string;
  value: string | number;
}

export abstract class AbstractUserRepository {
  abstract insert(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<boolean>;
  abstract get(params: IWhereQueryParam[]): Promise<IUser | null>;
}

export class UserRepositoryErrorProxy implements AbstractUserRepository {
  constructor(private repo: UserRepository) {}

  async insert(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await this.repo.insert(name, email, hashedPassword);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }

  async get(params: IWhereQueryParam[]): Promise<IUser | null> {
    try {
      return await this.repo.get(params);
    } catch (error) {
      throw DatabaseErrorMapper.toApiError(error);
    }
  }
}
