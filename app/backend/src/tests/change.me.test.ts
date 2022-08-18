import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import  Users from '../database/models';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'sequelize/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
  //   sinon
  //     .stub(Users as unknown as Model, "set")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Users);
  // });
  // sinon
  //     .stub(Users as unknown as Model, "set")
  //     .resolves();
  });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('should return a status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login');
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(200)
  });

  it('should return a token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login');
    expect(chaiHttpResponse.body).to.haveOwnProperty('token')
  });
});
