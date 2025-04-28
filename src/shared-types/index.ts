import { Request } from 'express';

export interface IRequestToPassJWTPayload extends Request {
  jwtPayload?: {
    id: number;
  };
}
