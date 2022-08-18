import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/loginService';
import { ILogin, Itoken } from '../interfaces/login';

interface ILoginService {
  login(body: ILogin): Promise<Itoken>
}

class LoginController {
  private loginService: ILoginService = new LoginService();

  async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const token: Itoken = await this.loginService.login(req.body);
    res.status(StatusCodes.OK).json(token);
  }
}

export default LoginController;
