import { Response, NextFunction } from 'express';
import { JWT } from '../utils';
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
    res.status(401).send({ isLogged: false, message: 'No Logged user' });
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
    console.error(error);
    res.status(401).send({ isLogged: false, message: 'Expired token' });
  }
};

export default checkAuth;
