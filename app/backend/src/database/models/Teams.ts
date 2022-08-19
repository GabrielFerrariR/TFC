import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;
  public teamName!: string;
}
Users.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  underscored: true,
});

export default Users;
