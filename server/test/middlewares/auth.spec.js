import httpMocks from 'node-mocks-http';
import events from 'events';
import chai from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../config/app';
import helper from '../helper/test.helper';
import db from '../../models';
import Auth from '../../middlewares/auth';

const expect = chai.expect;
const superRequest = supertest(app);

let request;
const responseEvent = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });

describe('MIDDLEWARE UNIT TEST', () => {
  let adminToken;
  let regularUser = helper.regularUser;
  let regularToken;

  before((done) => {
    db.Role.bulkCreate([{ title: 'admin', description: 'Admin user', id: 1 },
     { title: 'regular', description: 'Regular user', id: 2 }])
      .then((roles) => {
        helper.adminUser.roleId = roles[0].id;
        helper.regularUser.roleId = roles[1].id;
        db.User.create(helper.adminUser)
          .then(() => {
            superRequest.post('/users/login')
              .send(helper.adminUser)
              .end((err, res) => {
                adminToken = res.body.token;
                db.User.create(regularUser)
                  .then((reUser) => {
                    regularUser = reUser;
                    superRequest.post('/users/login')
                      .send(helper.regularUser)
                      .end((err, res) => {
                        regularToken = res.body.token;
                        done();
                      });
                  });
              });
          });
      });
  });

  after((done) => {
    db.Role.destroy({ where: {} });
    done();
  });

  describe('VERIFY TOKEN', () => {
    it('should continue if token is valid', (done) => {
      const response = httpMocks.createResponse();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': adminToken }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyToken(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not continue if token is invalid', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { authorization: 'hhehagagagg' }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyToken(request, response, middlewareStub.callback);
      response.on('end', () => {
        expect(response._getData().message).to
        .equal('Token Authentication failed');
        done();
      });
    });
  });

  it('should continue for admin user', (done) => {
    const response = responseEvent();
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/roles',
      headers: { authorization: adminToken },
      decoded: { roleId: helper.adminUser.roleId, id: 1 }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    Auth.authorizeAdmin(request, response, middlewareStub.callback);
    expect(middlewareStub.callback).to.have.been.called;
    done();
  });
});

it('should not continue for empty token', (done) => {
  const response = responseEvent();
  request = httpMocks.createRequest({
    method: 'GET',
    url: '/roles'
  });
  const middlewareStub = {
    callback: () => { }
  };
  sinon.spy(middlewareStub, 'callback');
  Auth.verifyToken(request, response, middlewareStub.callback);
  expect(middlewareStub.callback).to.have.been.called;
  done();
});

