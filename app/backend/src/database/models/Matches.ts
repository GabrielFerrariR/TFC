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
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'home_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam!: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'away_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: DataTypes.INTEGER,
  inProgress!: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Teams.hasMany(Matches, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default Matches;
