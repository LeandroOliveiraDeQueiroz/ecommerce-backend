import { Response, NextFunction } from 'express';
import { ApiError, JWT } from '../utils';
import { IRequestToPassJWTPayload } from '../shared-types';

const noAuthenticatedRoutes = new Set(['/user/signin', '/user/login']);

const checkAuth = async (
  req: IRequestToPassJWTPayload,
  res: Response,
  next: NextFunction
) => {
  if (noAuthenticatedRoutes.has(req.path)) {
    next();
    return;
  }

  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const apiError = new ApiError(401, 'Usuário não logado');
    res.status(apiError.statusCode).send({ message: apiError.message });
    return;
  }

  try {
    const jwtPayload = await JWT.validateToken<{ id: number }>({
      token: accessToken,
      jwtSecret: process.env.JWT_SECRET_KEY || '',
    });

    req.jwtPayload = jwtPayload;
    next();
  } catch (error) {
    const apiError = new ApiError(401, 'Usuário não logado');
    console.error(error);

    res.status(apiError.statusCode).send({ message: apiError.message });
  }
};

export default checkAuth;
