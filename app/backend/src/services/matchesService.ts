import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IMatch } from '../interfaces/matches';
import Unauthorized from '../errors/Unauthorized';

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
    const { homeTeam, awayTeam } = values;
    if (homeTeam === awayTeam) {
      throw new Unauthorized('It is not possible to create a match with two equal teams');
    }
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
