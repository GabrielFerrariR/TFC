import { NextFunction, Request, Response } from 'express';
import Teams from '../database/models/Teams';
import TeamsService from '../services/teamsService';

class TeamsController {
  constructor(private teamsService = new TeamsService()) {}
  async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const data: Teams[] = await this.teamsService.getAll();
    res.status(200).json(data);
  }
}

export default TeamsController;
