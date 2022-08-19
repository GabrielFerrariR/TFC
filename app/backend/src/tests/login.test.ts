import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import { Model } from 'sequelize/types';
import { invalidUser, token, validAdmin, validUser } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;




let chaiHttpResponse: Response;

describe('POST /login on success', () => {

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(validUser as unknown as Model);
    sinon
    .stub(bcrypt, 'compare')
    .resolves(true);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('should return a status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({
        email: validAdmin.email,
        password: 'secret_admin'
      });
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(200)
  });

  it('should return a token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({
        email: validAdmin.email,
        password: 'secret_admin'
      });;
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });
});

describe('POST /login on fail', () => {
  describe('when the fields are empty', () => {
    beforeEach( async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login').send();
    });
    afterEach(sinon.restore);
    it('should return status 400 on empty fields', () => {
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(400);
    });
    it('should return an object with the message "All fields must be filled"', () => {
      expect(chaiHttpResponse.body).to.haveOwnProperty("message");
      expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled");
    });
  })
  describe('when the email is invalid', () => {
    beforeEach( async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves(null)
      chaiHttpResponse = await chai
        .request(app)
        .post('/login').send({
          email: invalidUser.email,
          password: 'secret_admin',
        });
    });
    afterEach(sinon.restore);
    it('should return status 401', () => {
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(401);
    });
    it('should return an object with the message "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body).to.haveOwnProperty("message");
      expect(chaiHttpResponse.body.message).to.be.equal("Incorrect email or password");
    });
  })
  describe('when the password is invalid', () => {
    beforeEach( async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves(validAdmin as unknown as Model)
      chaiHttpResponse = await chai
        .request(app)
        .post('/login').send({
          email: validAdmin.email,
          password: 'invalid_admin',
        });
    });
    afterEach(sinon.restore);
    it('should return status 401', () => {
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(401);
    });
    it('should return an object with the message "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body).to.haveOwnProperty("message");
      expect(chaiHttpResponse.body.message).to.be.equal("Incorrect email or password");
    });
  })
})
describe('GET /login/validate', async () => {
  beforeEach(async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set( { authorization: token })
  })
  afterEach(sinon.restore)
  it('should return status 200', () => {
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(200);
  })
  it('should return an object with user role', () => {
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('role');
    expect(chaiHttpResponse.body.role).to.be.equal('admin')
  })
})
