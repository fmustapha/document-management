'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../../config/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superRequest = _supertest2.default.agent(_app2.default);
var expect = _chai2.default.expect;

describe('ROUTE GET /', function () {
  it('should return a welcome message', function (done) {
    superRequest.get('/').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Welcome to Document Management System');
      done();
    });
  });
  it('should return a message when accessing an unknown route', function (done) {
    superRequest.get('/users/name/andela/olawalequest').end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('REQUEST PAGE NOT FOUND');
      done();
    });
  });
});