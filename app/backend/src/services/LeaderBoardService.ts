import homeLeaderBoard, { awayLeaderBoard } from '../queries';
import sequelize from '../database/models';

export default class LeaderBoardService {
  static async getHomeScore() {
    const [data] = await sequelize.query(homeLeaderBoard);
    return data;
  }

  static async getAwayScore() {
    const [data] = await sequelize.query(awayLeaderBoard);
    return data;
  }
}
