import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;
  public role!: string;
  public email!: string;
  public password: string;
}
Users.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
