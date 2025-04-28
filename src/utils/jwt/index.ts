import jwt, { JwtPayload } from 'jsonwebtoken';
import { IGenerateToken, IVerifyToken } from './types';

type JwtPayloadExtended<T> = JwtPayload & T;

export class JWT {
  static generateToken({ payload, jwtSecret, options }: IGenerateToken) {
    return jwt.sign(payload, jwtSecret, options);
  }

  static async validateToken<T>({
    token,
    jwtSecret,
  }: IVerifyToken): Promise<JwtPayloadExtended<T>> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, {}, (error, tokenPayload = {}) => {
        if (error) {
          reject(new Error('Invalid token'));
          return;
        }

        resolve(tokenPayload as Promise<JwtPayloadExtended<T>>);
      });
    });
  }
}
