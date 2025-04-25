import { SignOptions } from 'jsonwebtoken';

export interface IGenerateToken {
  payload: string | object | Buffer;
  jwtSecret: string;
  options: SignOptions;
}

export interface IVerifyToken {
  token: string;
  jwtSecret: string;
}
