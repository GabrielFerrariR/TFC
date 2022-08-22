import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Matches from '../database/models/Matches';
import MatchesService from '../services/matchesService';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}
  async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const data: Matches[] = await this.matchesService.getAll();
    res.status(StatusCodes.OK).json(data);
  }

  async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const data: Matches = await this.matchesService.create(req.body);
    res.status(StatusCodes.CREATED).json(data);
  }

  async finishById(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { id } = req.params;
    await this.matchesService.finishById(+id);
    res.status(StatusCodes.OK).json({ message: 'finished' });
  }
}

export default MatchesController;
