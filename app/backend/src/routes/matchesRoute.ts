import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const route = Router();

const matchesController = new MatchesController();

route.get('/matches', (req, res, next) => matchesController.getAll(req, res, next));

export default route;
