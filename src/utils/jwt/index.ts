import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { IGenerateToken, IVerifyToken } from './types';

export class JWT {
  static generateToken({ payload, jwtSecret, options }: IGenerateToken) {
    return jwt.sign(payload, jwtSecret, options);
  }

  static validateToken({ token, jwtSecret }: IVerifyToken) {
    return jwt.verify(token, jwtSecret);
  }

  static extractToken() {}
}
