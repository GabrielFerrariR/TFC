import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const route = Router();

const teamsController = new TeamsController();

route.get('/teams', (req, res, next) => teamsController.getAll(req, res, next));

export default route;
