import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async getHomeScore(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const data = await LeaderBoardService.getHomeScore();
    res.status(StatusCodes.OK).send(data);
  }

  static async getAwayScore(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const data = await LeaderBoardService.getAwayScore();
    res.status(StatusCodes.OK).send(data);
  }
}
