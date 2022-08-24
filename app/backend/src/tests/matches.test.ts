import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';
import { Model } from 'sequelize/types';
import { matches, matchProgress, token } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('GET /matches', () => {
  describe('on a successful fetch', () => {
    beforeEach(async () => {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matches as unknown as Model<any, any>[]);
      chaiHttpResponse = await chai.request(app).get('/matches').set( { authorization: token });
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


describe('POST /matches', () => {
  describe('on a successful fetch', () => {
    beforeEach(async () => {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matches as unknown as Model<any, any>[]);
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set( { authorization: token });
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

describe('PATCH /matches/:id', () => {
  it('should update the goals of the match with a status 200', async () => {
    // sinon
    //     .stub(Matches, 'findAll')
    //     .resolves(matches as unknown as Model<any, any>[]);
      chaiHttpResponse = await chai.request(app).post('/matches/1').send(matchProgress).set( { authorization: token });
      expect(chaiHttpResponse.status).to.be.equal(200)
  })
})