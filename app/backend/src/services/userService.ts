import Users from '../database/models/Users';

class UserService {
  static async findUser(email: string) {
    const user = await Users.findOne({
      where: { email },
      raw: true,
    });
    return user;
  }
}

export default UserService;
