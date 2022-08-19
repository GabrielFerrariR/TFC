import Users from '../database/models/Users';

class UserService {
  constructor(private users = Users) {}
  async findUser(email: string) {
    const user = await this.users.findOne({
      where: { email },
      raw: true,
    });
    return user;
  }
}

export default UserService;
