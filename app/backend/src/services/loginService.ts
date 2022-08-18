import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import BadRequest from '../errors/BadRequest';
import { ILogin, Itoken } from '../interfaces/login';
import UserService from './userService';
import Users from '../database/models/Users';

const secret = process.env.JWT_SECRET || 'jwt_secret'

class LoginService {
  private userService = new UserService();

  static async login(body: ILogin): Promise<Itoken> {
    const { email, password } = body;
    if (!email || !password) throw new BadRequest('All fields must be filled');
    const user = await UserService.findUser(email);
    LoginService.verifyEmail(user);
    if (user) LoginService.verifyPassword(password, user.password);
    const token = jwt.sign(password, secret);
    return {
      token,
    };
  }

  static async verifyEmail(user: Users | null): Promise<void> {
    if (!user) throw new BadRequest('Incorrect email or password');
  }

  static async verifyPassword(pw: string, user: string): Promise<void> {
    const isCorrect = await bcrypt.compare(pw, user);
    if (!isCorrect) throw new BadRequest('Incorrect email or password');
  }
}

export default LoginService;
