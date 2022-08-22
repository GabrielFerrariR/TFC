import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import LoginController from '../controllers/loginControler';

chai.use(chaiHttp);

let chaiHttpResponse: Response;

const { expect } = chai;

describe('all routes', () => {
  it('throws an internal server error with status 500 when unexpected', async () => {
    sinon.stub(LoginController, 'validate').throws()
    chaiHttpResponse = await (await chai.request(app).get('/login'))
    expect(chaiHttpResponse.status).to.be.equal(500);
  })
})