import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/loginService';
import { IToken } from '../interfaces/login';

class LoginController {
  constructor(private loginService = new LoginService()) {}
  async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const token: IToken = await this.loginService.login(req.body);
    res.status(StatusCodes.OK).json(token);
  }
}

export default LoginController;
