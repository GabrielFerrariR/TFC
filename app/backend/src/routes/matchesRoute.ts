import { Router } from 'express';
import authMiddleware from '../middlewares/authorization';
import MatchesController from '../controllers/matchesController';

const route = Router();

const matchesController = new MatchesController();

route.patch(
  '/matches/:id/finish',
  (req, res, next) => matchesController.finishById(req, res, next),
);
route.get('/matches', (req, res, next) => matchesController.getAll(req, res, next));
route.post(
  '/matches',
  authMiddleware,
  (req, res, next) => matchesController.create(req, res, next),
);

export default route;
