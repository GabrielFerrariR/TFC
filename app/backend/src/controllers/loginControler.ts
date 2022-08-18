import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/loginService';
import { Itoken } from '../interfaces/login';

class LoginController {
  static async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const token: Itoken = await LoginService.login(req.body);
    res.status(StatusCodes.OK).json(token);
  }
}

export default LoginController;
