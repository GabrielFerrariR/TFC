import NotFound from '../errors/NotFound';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IMatch, IMatchBoard } from '../interfaces/matches';
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
    const teamsExist = await this.verifyTeams([homeTeam, awayTeam]);
    if (!teamsExist) throw new NotFound('There is no team with such id!');
    const match = await this.model.create(values);
    return match;
  }

  private async verifyTeams(teams: number[]): Promise<boolean> {
    const [team1, team2] = await Promise.all(teams.map(async (id) => this.model.findOne({
      where: { id },
      raw: true,
    })));
    return !!(team1 && team2);
  }

  async finishById(id: number) {
    const match = await this.model.update({ inProgress: false }, {
      where: { id },
    });
    return match;
  }

  async updateMatch(id:number, body: IMatchBoard) {
    await this.model.update(body, {
      where: { id },
    });
  }
}

export default MatchesService;
