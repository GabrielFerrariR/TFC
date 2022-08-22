import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

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

  async getOne(id: number): Promise<Matches | null> {
    const matches = await this.model.findByPk(id);
    return matches;
  }
}

export default MatchesService;
