'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _models = require('../../app/models');

var _models2 = _interopRequireDefault(_models);

var _Helper = require('../../app/helper/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superRequest = _supertest2.default.agent(_config2.default);
var expect = _chai2.default.expect;

var adminParams = _Helper2.default.firstUser;
var adminRoleParams = _Helper2.default.adminRole;
var regularRoleParams = _Helper2.default.regularRole;

var adminToken = void 0,
    reguToken = void 0;
var role = void 0;

describe('ROLE API', function () {
  before(function (done) {
    _models2.default.Role.create(adminRoleParams).then(function (newRole) {
      adminParams.roleId = newRole.id;
      _models2.default.User.create(adminParams).then(function () {
        superRequest.post('/users/login').send(adminParams).end(function (err, res) {
          adminToken = res.body.token;
          done();
        });
      });
    });
  });

  after(function () {
    return _models2.default.Role.destroy({ where: {} });
  });

  describe('ADMIN', function () {
    it('should allow admin to create a role', function (done) {
      superRequest.post('/roles').send(regularRoleParams).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.role.title).to.equal(regularRoleParams.title);
        done();
      });
    });

    it('should return error when role title already exist', function (done) {
      regularRoleParams.id = 44;
      superRequest.post('/roles').send(regularRoleParams).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.errorArray[0].message).to.equal('role already exist');
        done();
      });
    });

    it('should return error for empty string title', function (done) {
      superRequest.post('/roles').send({ title: '' }).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.errorArray[1].message).to.equal('This field cannot be empty');
        done();
      });
    });

    it('should return varification failed when no token is supplied', function (done) {
      superRequest.post('/roles').send(_Helper2.default.guestRole1).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please sign in or register to get a token');
        done();
      });
    });

    it('should not allow regular user to create a role', function (done) {
      superRequest.post('/users').send(_Helper2.default.regularUser2).end(function (err, res) {
        reguToken = res.body.token;
        superRequest.post('/roles').send(_Helper2.default.sampleRole).set({ 'x-access-token': reguToken }).end(function (er, re) {
          expect(re.status).to.equal(403);
          expect(re.body.message).to.equal('You are not permitted to perform this action');
          done();
        });
      });
    });
  });

  describe('DELETE ROLE, DELETE /roles', function () {
    before(function (done) {
      superRequest.post('/roles').send(_Helper2.default.guestRole1).set({ 'x-access-token': adminToken }).end(function (err, res) {
        role = res.body.role;
        done();
      });
    });

    it('should delete a role', function (done) {
      superRequest.delete('/roles/' + role.id).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('This role has been deleted');
        done();
      });
    });

    var roleArray = [1, 2];
    roleArray.forEach(function (roleId) {
      it('should not allow admin to delete role with id ' + roleId, function (done) {
        superRequest.delete('/roles/' + roleId).set({ 'x-access-token': adminToken }).end(function (er, re) {
          expect(re.status).to.equal(403);
          expect(re.body.message).to.equal('You are not permitted to modify this role');
          done();
        });
      });
    });

    it('should not allow regular user to delete a role', function (done) {
      superRequest.delete('/roles/' + role.id).set({ 'x-access-token': reguToken }).end(function (er, re) {
        expect(re.status).to.equal(403);
        expect(re.body.message).to.equal('You are not permitted to perform this action');
        done();
      });
    });

    it('should return id not found for invalid id', function (done) {
      superRequest.delete('/roles/999').set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This role does not exist');
        done();
      });
    });
  });

  describe('GET BY ID', function () {
    before(function (done) {
      superRequest.post('/roles').send(_Helper2.default.guestRole2).set({ 'x-access-token': adminToken }).end(function (err, res) {
        role = res.body.role;
        done();
      });
    });

    it('should return role when provided with valid id', function (done) {
      superRequest.get('/roles/' + role.id).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('This role has been retrieved successfully');
        expect(res.body.role.title).to.equal(role.title);
        done();
      });
    });

    it('should not allow regular user to get role', function (done) {
      superRequest.get('/roles/' + role.id).set({ 'x-access-token': reguToken }).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('You are not permitted to perform this action');
        done();
      });
    });

    it('should return not found when provided with invalid id', function (done) {
      superRequest.get('/roles/9999').set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This role does not exist');
        done();
      });
    });
  });

  describe('UPDATE PUT /roles/:id', function () {
    var newRole = void 0;
    before(function (done) {
      superRequest.post('/roles').send(_Helper2.default.guestRole3).set({ 'x-access-token': adminToken }).end(function (err, res) {
        newRole = res.body.role;
        done();
      });
    });

    it('should update a role when given a valid id', function (done) {
      superRequest.put('/roles/' + newRole.id).send({ title: 'andela' }).set({ 'x-access-token': adminToken }).end(function (er, re) {
        expect(re.status).to.equal(200);
        expect(re.body.message).to.equal('This role has been updated');
        expect(re.body.updatedRole.title).to.equal('andela');
        done();
      });
    });

    it('should not update a role when given an empty title string', function (done) {
      superRequest.put('/roles/' + newRole.id).send({ title: '' }).set({ 'x-access-token': adminToken }).end(function (er, re) {
        expect(re.status).to.equal(400);
        expect(re.body.errorArray[1].message).to.equal('This field cannot be empty');
        done();
      });
    });

    var roleArray = [1, 2];
    roleArray.forEach(function (roleId) {
      it('should not allow admin to update role with id ' + roleId, function (done) {
        superRequest.put('/roles/' + roleId).send({ title: 'andela' }).set({ 'x-access-token': adminToken }).end(function (er, re) {
          expect(re.status).to.equal(403);
          expect(re.body.message).to.equal('You are not permitted to modify this role');
          done();
        });
      });
    });

    it('should not allow regular user to update role', function (done) {
      superRequest.get('/roles/' + newRole.id).set({ 'x-access-token': reguToken }).end(function (er, re) {
        expect(re.status).to.equal(403);
        expect(re.body.message).to.equal('You are not permitted to perform this action');
        done();
      });
    });

    it('should return not found for invalid id', function (done) {
      superRequest.put('/roles/999').send({ title: 'talent' }).set({ 'x-access-token': adminToken }).end(function (error, resp) {
        expect(resp.status).to.equal(404);
        expect(resp.body.message).to.equal('This role does not exist');
        done();
      });
    });
  });

  describe('GET ALL ROLES GET /roles', function () {
    before(function (done) {
      superRequest.post('/roles').send(_Helper2.default.guestRole1).set({ 'x-access-token': adminToken });
      done();
    });

    it('it should allow admin to view all roles', function (done) {
      superRequest.get('/roles').set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('You have successfully retrived all roles');
        expect(res.body.roles.length).to.be.greaterThan(0);
        done();
      });
    });

    it('should not allow regular user to view all roles', function (done) {
      superRequest.get('/roles').set({ 'x-access-token': reguToken }).end(function (er, re) {
        expect(re.status).to.equal(403);
        expect(re.body.message).to.equal('You are not permitted to perform this action');
        done();
      });
    });
  });
});