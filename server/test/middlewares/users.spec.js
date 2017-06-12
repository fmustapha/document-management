// import request from 'supertest';
import chai from 'chai';
import httpMocks from 'node-mocks-http';
import events from 'events';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import validateSignup from '../../middlewares/validateSignup';
// import helper from '../helper/test.helper';
import server from '../../../server';

chai.use(chaiHttp);

const expect = chai.expect;
const responseEvent = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });

describe.only('middleware', () => {
  let userToken, userBody, request;

  before((done) => {
    chai.request(server)
      .post('/api/users/login/')
      .send({
        email: 'mike@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        userToken = res.body.token;
        userBody = res.body;
        done();
      });
  });

  describe('ValidateSignUp', () => {
    it('should not allow invalid username', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users/',
        // headers: { authorization: `bearer ${userToken}` },
        body: {
          username: '',
          email: 'test@test.com',
          firstname: 'tyrion',
          lastname: 'lannister',
          password: 'terribleLannister'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      
      sinon.spy(middlewareStub, 'callback');

      response.on('end', () => {
        const data = JSON.parse(response._getData());
        expect(data.message).to.equal('enter a valid username');
        expect(middlewareStub.callback.called).to.equal(false);
      });
      validateSignup(request, response, middlewareStub.callback);
    });

    it('should not allow invalid firstname', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users/',
        // headers: { authorization: `bearer ${userToken}` },
        body: {
          username: 'myusername',
          firstname: '',
          email: 'test@test.com',
          lastname: 'lannister',
          password: 'terribleLannister'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      
      sinon.spy(middlewareStub, 'callback');

      response.on('end', () => {
        const data = JSON.parse(response._getData());
        expect(data.message).to.equal('enter a valid firstname');
        expect(middlewareStub.callback.called).to.equal(false);
      });
      validateSignup(request, response, middlewareStub.callback);
    });

    it('should not allow invalid lastname', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users/',
        // headers: { authorization: `bearer ${userToken}` },
        body: {
          username: 'myusername',
          firstname: 'myfirstname',
          lastname: '',
          email: 'test@test.com',
          password: 'terribleLannister'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      
      sinon.spy(middlewareStub, 'callback');

      response.on('end', () => {
        const data = JSON.parse(response._getData());
        expect(data.message).to.equal('enter a valid lastname');
        expect(middlewareStub.callback.called).to.equal(false);
      });
      validateSignup(request, response, middlewareStub.callback);
    });

    it('should not allow invalid email', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users/',
        // headers: { authorization: `bearer ${userToken}` },
        body: {
          username: 'myusername',
          firstname: 'myfirstname',
          lastname: 'mylastname',
          email: '',
          password: 'terribleLannister'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      
      sinon.spy(middlewareStub, 'callback');

      response.on('end', () => {
        const data = JSON.parse(response._getData());
        expect(data.message).to.equal('enter a valid email address');
        expect(middlewareStub.callback.called).to.equal(false);
      });
      validateSignup(request, response, middlewareStub.callback);
    });

    it('should not allow invalid password', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users/',
        // headers: { authorization: `bearer ${userToken}` },
        body: {
          username: 'myusername',
          firstname: 'myfirstname',
          lastname: 'mylastname',
          email: 'my@email.com',
          password: ''
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
 
      sinon.spy(middlewareStub, 'callback');

      response.on('end', () => {
        const data = JSON.parse(response._getData());
        expect(data.message).to.equal('password must be a minimum of 8 characters');
        expect(middlewareStub.callback.called).to.equal(false);
      });
      validateSignup(request, response, middlewareStub.callback);
    });

    it('should call next() if fields are valid', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users/',
        body: {
          username: 'myusername',
          firstname: 'myfirstname',
          lastname: 'mylastname',
          email: 'my@email.com',
          password: 'password'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
 
      sinon.spy(middlewareStub, 'callback');

      response.on('end', () => {
        const data = JSON.parse(response._getData());
        expect(middlewareStub.callback.called).to.equal(true);
        expect(middlewareStub.callback.callCount).to.equal(1);
      });
      validateSignup(request, response, middlewareStub.callback);
    });
  });
});
