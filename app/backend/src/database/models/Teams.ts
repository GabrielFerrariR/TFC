import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';

class Teams extends Model {
  public id!: number;
  public teamName!: string;
}
Teams.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  underscored: true,
});

export default Teams;
