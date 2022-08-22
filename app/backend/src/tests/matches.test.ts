import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';
import { Model } from 'sequelize/types';
import { matches } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('GET /matches', () => {
  describe('on a successful fetch', () => {
    beforeEach(async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');
      sinon
        .stub(Matches, 'findAll')
        .resolves(matches as unknown as Model<any, any>[]);
    });
    afterEach(sinon.restore)
    it('should return status 200', async() => {
      
      expect(chaiHttpResponse.status).to.be.equal(200)
    });
    it('should return an unfiltered array of matches', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(matches);
    })
  } )

})