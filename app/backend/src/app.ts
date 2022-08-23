import * as express from 'express';
import 'express-async-errors';
import LoginController from './controllers/loginControler';
import errorMiddleWare from './middlewares/error.middleware';
import teamsRoute from './routes/teamsRoute';
import matchesRoute from './routes/matchesRoute';
import leaderBoardRoute from './routes/leaderBoardRoute';

const loginController = new LoginController();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', (req, res, next) => loginController.login(req, res, next));
    this.app.get('/login/validate', (req, res, next) => LoginController.validate(req, res, next));
    this.app.use(teamsRoute);
    this.app.use(matchesRoute);
    this.app.use(leaderBoardRoute);
    this.app.use(errorMiddleWare);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
