import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized';
import BadRequest from '../errors/BadRequest';
import { ILogin, IToken } from '../interfaces/login';
import UserService from './userService';
import Users from '../database/models/Users';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class LoginService {
  constructor(private userService = new UserService()) {}

  async login(payload: ILogin): Promise<IToken> {
    const { email, password } = payload;
    LoginService.verifyFields(payload);

    const user = await this.userService.findUser(email);
    LoginService.verifyEmail(user);

    if (user) await LoginService.verifyPassword(password, user.password);

    const token = jwt.sign(password, secret);
    return {
      token,
    };
  }

  private static verifyFields({ email, password }: ILogin) {
    if (!email || !password) throw new BadRequest('All fields must be filled');
  }

  private static verifyEmail(user: Users | null): void {
    if (!user) throw new Unauthorized('Incorrect email or password');
  }

  private static async verifyPassword(pw: string, user: string): Promise<void> {
    const isCorrect = await bcrypt.compare(pw, user);
    if (!isCorrect) throw new Unauthorized('Incorrect email or password');
  }
}

export default LoginService;
