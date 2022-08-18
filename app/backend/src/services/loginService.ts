import * as bcrypt from 'bcryptjs';
import BadRequest from '../errors/BadRequest';
import { ILogin, Itoken } from '../interfaces/login';
import UserService from './userService';

class LoginService {
  private userService = new UserService();
  login(body: ILogin): Promise<Itoken> {
    const { email, password } = body;
    if (!email) throw new BadRequest('All fields must be filled');
  }

  static verifyEmail(email: string): boolean {
    const isSigned = UserService.findUser(email);
    if (!isSigned) throw new BadRequest('')
    return true;
  }

  static verifyPassword(password: string): boolean {
    bcrypt.compare(password, hash)
  }
}

export default LoginService;
