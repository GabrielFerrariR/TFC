import Teams from '../database/models/Teams';

class TeamsService {
  constructor(private model = Teams) {}

  async getAll(): Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getOne(id: number): Promise<Teams | null> {
    const teams = await this.model.findByPk(id);
    return teams;
  }
}

export default TeamsService;
