import homeLeaderBoard from '../queries';
import sequelize from '../database/models';

export default class LeaderBoardService {
  static async getHomeScore() {
    const [data] = await sequelize.query(homeLeaderBoard);
    console.log(' ~ file: ts ~ line 7 ~ LeaderBoardService ~ getHomeScore ~ data', data);
    return data;
  }
}
