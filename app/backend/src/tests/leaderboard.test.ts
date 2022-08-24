import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import sequelize from '../database/models';
import Users from '../database/models/Users';
import { Response } from 'superagent';
import { Model, Sequelize } from 'sequelize/types';
import { awayLBoard, homeLBoard, leaderboard } from './mocks';
import LeaderBoardService from '../services/LeaderBoardService';

chai.use(chaiHttp);
const { expect } = chai;
let chaiHttpResponse: Response;
let metadata:string = 'nada';

describe('GET /leaderboard/home' ,() => {
  describe('on a successful request', () => {
    beforeEach(async () => {
      sinon
      .stub(sequelize, 'query')
      .resolves([homeLBoard, metadata])
      chaiHttpResponse =  await chai
        .request(app)
        .get('/leaderboard/home')
    })
    afterEach(sinon.restore)
    it('should return a status 200',() => {
      expect(chaiHttpResponse.status).to.be.equal(200)
    })
    it('should return an array with the leaderboards', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(homeLBoard)
    })
  })
});
describe('GET /leaderboard/away' ,() => {
  describe('on a successful request', () => {
    beforeEach(async () => {
      sinon
      .stub(sequelize, 'query')
      .resolves([awayLBoard, metadata])
      chaiHttpResponse =  await chai
        .request(app)
        .get('/leaderboard/away')
    })
    afterEach(sinon.restore)
    it('should return a status 200',() => {
      expect(chaiHttpResponse.status).to.be.equal(200)
    })
    it('should return an array with the leaderboards', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(awayLBoard)
    })
  })
});
describe('GET /leaderboard/' ,() => {
  describe('on a successful request', () => {
    beforeEach(async () => {
      sinon
      .stub(LeaderBoardService, 'getHomeScore')
      .resolves(homeLBoard)
      sinon
      .stub(LeaderBoardService, 'getAwayScore')
      .resolves(awayLBoard)
      chaiHttpResponse =  await chai
        .request(app)
        .get('/leaderboard/')
    })
    afterEach(sinon.restore)
    it('should return a status 200',() => {
      expect(chaiHttpResponse.status).to.be.equal(200)
    })
    it('should return an array with the leaderboards', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(leaderboard)
    })
  })
});