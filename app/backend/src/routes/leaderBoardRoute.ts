import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const route = Router();

route.get('/leaderboard/home', LeaderBoardController.getHomeScore)
  .get('/leaderboard/away', LeaderBoardController.getAwayScore);

export default route;
