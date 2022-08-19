import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Matches.init({
  id: DataTypes.INTEGER,
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals!: DataTypes.INTEGER,
  awayTeam!: DataTypes.INTEGER,
  awayTeamGoals!: DataTypes.INTEGER,
  inProgress!: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Teams.belongsTo(Matches, {
  foreignKey: 'id',
  as: 'homeTeam',
});
Teams.belongsTo(Matches, {
  foreignKey: 'id',
  as: 'awayTeam',
});

Matches.hasMany(Teams, {
  foreignKey: 'id',
  as: 'homeTeam' });
Matches.hasMany(Teams, {
  foreignKey: 'id',
  as: 'awayTeam',
});

export default Matches;
