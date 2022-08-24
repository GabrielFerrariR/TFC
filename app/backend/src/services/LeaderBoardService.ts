import homeLeaderBoard, { awayLeaderBoard } from '../queries';
import sequelize from '../database/models';
import { ILBNum, ILBRowNum, ILeaderBoard } from '../interfaces/leaderboard';

export default class LeaderBoardService {
  static async getHomeScore() {
    const [data] = await sequelize.query(homeLeaderBoard);
    return data;
  }

  static async getAwayScore() {
    const [data] = await sequelize.query(awayLeaderBoard);
    return data;
  }

  static async getLeaderBoard() {
    const teamsAwayScore = await LeaderBoardService.getAwayScore() as ILeaderBoard;
    const teamsHomeScore = await LeaderBoardService.getHomeScore() as ILeaderBoard;
    const mergedData : ILBNum = LeaderBoardService.sumScore(teamsHomeScore, teamsAwayScore);
    const unrankedLB = LeaderBoardService.calcEfficiency(mergedData);
    return LeaderBoardService.toRank(unrankedLB);
  }

  private static sumScore(tHomeScore: ILeaderBoard, tAwayScore: ILeaderBoard): ILBNum {
    const data = tHomeScore.map((team) => {
      const awayScore = tAwayScore.find((score) => score.name === team.name);
      return {
        name: team.name,
        totalPoints: Number(team.totalPoints) + Number(awayScore?.totalPoints),
        totalGames: Number(team.totalGames) + Number(awayScore?.totalGames),
        totalVictories: Number(team.totalVictories) + Number(awayScore?.totalVictories),
        totalDraws: Number(team.totalDraws) + Number(awayScore?.totalDraws),
        totalLosses: Number(team.totalLosses) + Number(awayScore?.totalLosses),
        goalsFavor: Number(team.goalsFavor) + Number(awayScore?.goalsFavor),
        goalsOwn: Number(team.goalsOwn) + Number(awayScore?.goalsOwn),
        goalsBalance: Number(team.goalsBalance) + Number(awayScore?.goalsBalance),
      } as ILBRowNum;
    });
    return data;
  }

  private static calcEfficiency(score: ILBNum) {
    return score.map((team) => ({
      ...team,
      efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
    }));
  }

  private static toRank(unranked: ILBNum): ILBNum {
    return unranked.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  }
}
