import { NextFunction, Request, Response } from 'express';
import Matches from '../database/models/Matches';
import MatchesService from '../services/matchesService';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}
  async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const data: Matches[] = await this.matchesService.getAll();
    res.status(200).json(data);
  }
}

export default MatchesController;
