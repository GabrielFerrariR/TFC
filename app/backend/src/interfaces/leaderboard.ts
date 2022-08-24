export interface ILeaderBoardRow {
  name: string,
  totalPoints: string | number,
  totalGames: string | number,
  totalVictories: string | number,
  totalDraws: string | number,
  totalLosses: string | number,
  goalsFavor: string | number,
  goalsOwn: string | number,
  goalsBalance: string | number,
  efficiency: string | number,
}
export type ILeaderBoard = Array<ILeaderBoardRow>;

export interface ILBRowNum {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string | number,
}

export type ILBNum = Array<ILBRowNum>;
