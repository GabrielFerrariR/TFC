import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IMatch } from '../interfaces/matches';

class MatchesService {
  constructor(private model = Matches) {}

  async getAll(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [{
        model: Teams,
        attributes: { exclude: ['id'] },
        as: 'teamHome',
      },
      {
        model: Teams,
        attributes: { exclude: ['id'] },
        as: 'teamAway',
      },
      ],
      logging: console.log,
    });
    return matches;
  }

  async create(values : IMatch): Promise<Matches> {
    const match = await this.model.create(values);
    return match;
  }

  async finishById(id: number) {
    const match = await this.model.update({ inProgress: false }, {
      where: { id },
    });
    return match;
  }
}

export default MatchesService;
