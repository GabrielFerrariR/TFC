import { NextFunction, Request, Response } from 'express';
import Unauthorized from '../errors/Unauthorized';
import LoginService from '../services/loginService';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Unauthorized('Invalid auth');
  await LoginService.validate(authorization);
  next();
};

export default authMiddleware;
