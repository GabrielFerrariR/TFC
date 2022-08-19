import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';
import { Model } from 'sequelize/types';
import { invalidUser, teamsArray, token, validAdmin, validUser } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('GET /teams', () => {
  beforeEach(async () => {
    sinon
      .stub(Teams,'findAll')
      .resolves(teamsArray as unknown as Model<any, any>[]);
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
  });
  afterEach(sinon.restore);
  it('should return a status 200', () => {
    expect(chaiHttpResponse.status).to.be.equal(200)
  })
  it('should return a json with teams data', () => {
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsArray)
  })
})

describe('GET /teams/:id', () => {
  beforeEach(async () => {
    sinon
      .stub(Teams,'findByPk')
      .resolves(teamsArray[0] as unknown as Model<any, any> );
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
  });
  afterEach(sinon.restore);
  it('should return a status 200', () => {
    expect(chaiHttpResponse.status).to.be.equal(200)
  })
  it('should return a json with teams data', () => {
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsArray[0])
  })
})