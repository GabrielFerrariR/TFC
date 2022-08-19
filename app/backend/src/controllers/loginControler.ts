import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Unauthorized from '../errors/Unauthorized';
import LoginService from '../services/loginService';
import { IRole, IToken } from '../interfaces/login';

class LoginController {
  constructor(private loginService = new LoginService()) {}
  async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const token: IToken = await this.loginService.login(req.body);
    res.status(StatusCodes.OK).json(token);
  }

  static async validate(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) throw new Unauthorized('Invalid auth');
    const role: IRole = await LoginService.validate(authorization);
    res.status(StatusCodes.OK).json(role);
  }
}

export default LoginController;
