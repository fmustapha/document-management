'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _jsLogger = require('js-logger');

var _jsLogger2 = _interopRequireDefault(_jsLogger);

var _app = require('../../config/app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _Helper = require('../../helper/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superRequest = _supertest2.default.agent(_app2.default);
var expect = _chai2.default.expect;

var newAdminUser = void 0;
var adminToken = void 0;
var regularToken = void 0;
var regularUser = void 0;
var emptyValue = ['username', 'lastname', 'firstname', 'password', 'email'];
var uniqueField = ['username', 'email'];

describe('User API', function () {
  before(function (done) {
    _models2.default.Role.bulkCreate([{ title: 'admin', id: 1 }, { title: 'regular', id: 2 }]).then(function (role) {
      _Helper2.default.adminUser.roleId = role[0].id;
      _models2.default.User.create(_Helper2.default.adminUser).then(function (admin) {
        newAdminUser = admin.dataValues;
        done();
      });
    });
  });

  after(function () {
    _models2.default.Role.destroy({ where: {} });
  });

  describe('New Users', function () {
    _jsLogger2.default.info('===>>', _Helper2.default.regularUser);
    describe('Create User', function () {
      _jsLogger2.default.info('===>>', _Helper2.default.regularUser);
      it('should create a user', function (done) {
        _jsLogger2.default.info('===>>', _Helper2.default.regularUser);
        superRequest.post('/users').send(_Helper2.default.regularUser).end(function (error, response) {
          regularUser = response.body.user;
          expect(response.status).to.equal(201);
          expect(response.body.user.username).to.equal(_Helper2.default.regularUser.username);
          expect(response.body.user.firstname).to.equal(_Helper2.default.regularUser.firstname);
          expect(response.body.user.lastname).to.equal(_Helper2.default.regularUser.lastname);
          expect(response.body.user.roleId).to.equal(2);
          done();
        });
      });

      uniqueField.forEach(function (field) {
        var uniqueUser = Object.assign({}, _Helper2.default.firstUser);
        uniqueUser[field] = _Helper2.default.regularUser[field];
        it('should fail when already existing ' + field + ' is supplied', function (done) {
          superRequest.post('/users').send(uniqueUser).end(function (err, res) {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal(field + ' already exists');
            done();
          });
        });
      });

      emptyValue.forEach(function (field) {
        var invalidUser = Object.assign({}, _Helper2.default.secondUser);
        invalidUser[field] = '';
        it('should fail when ' + field + ' is invalid', function (done) {
          superRequest.post('/users').send(invalidUser).end(function (err, res) {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Enter a valid ' + field);
            done();
          });
        });
      });

      it('should fail if password is less than 8', function (done) {
        superRequest.post('/users').send(_Helper2.default.invalidPasswordUser).end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Minimum of 8 characters is allowed for password');
          done();
        });
      });

      it('should not allow admin user to sign up', function (done) {
        _Helper2.default.firstUser.roleId = 1;
        superRequest.post('/users').send(_Helper2.default.firstUser).end(function (err, res) {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Permission denied, You cannot sign up as an admin user');
          done();
        });
      });
    });
  });

  describe('Existing users', function () {
    describe('Login /users/login', function () {
      it('should allow admin user to login', function (done) {
        superRequest.post('/users/login').send(_Helper2.default.adminUser).end(function (err, res) {
          adminToken = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.token).to.not.equal(null);
          expect(res.body.message).to.equal('You have successfully logged in');
          done();
        });
      });

      it('should allow other users to login', function (done) {
        superRequest.post('/users/login').send(_Helper2.default.regularUser).end(function (err, res) {
          regularToken = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.token).to.not.equal(null);
          expect(res.body.message).to.equal('You have successfully logged in');
          done();
        });
      });

      it('should not allow unregistered users to login', function (done) {
        superRequest.post('/users/login').send(_Helper2.default.firstUser).end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Please enter a valid email or password to log in');
          done();
        });
      });

      it('should not allow login with invalid password', function (done) {
        superRequest.post('/users/login').send({ email: newAdminUser.email, password: 'invalid' }).end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Please enter a valid email or password to log in');
          done();
        });
      });

      it('should not allow login when email and password is not provided', function (done) {
        superRequest.post('/users/login').send({}).end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide your email and password to login');
          done();
        });
      });
    });

    describe('Get all users, GET /users ', function () {
      it('should return verification failed if no token is supply', function (done) {
        superRequest.get('/users').set({}).end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please sign in or register to get a token');
          done();
        });
      });

      it('should return invalid token if token is invalid', function (done) {
        superRequest.get('/users').set({ 'x-access-token': 'hello-andela-tia' }).end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('The token you supplied has expired');
          done();
        });
      });

      it('should return users own profile, \n      when the requester is a regular user', function (done) {
        superRequest.get('/users').set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('You have successfully retrived all users');
          expect(res.body.users.rows[0].username).to.equal(_Helper2.default.regularUser.username);
          done();
        });
      });

      it('should return all users profile, \n      when the requester is an admin user', function (done) {
        superRequest.get('/users').set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('You have successfully retrived all users');
          done();
        });
      });
    });

    describe('Get user by Id GET /users/:id', function () {
      it('should return verification failed for unregistered user', function (done) {
        superRequest.get('/users/' + newAdminUser.id).end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please sign in or register to get a token');
          done();
        });
      });

      it('should return user\'s profile when valid user\'s id is supplied', function (done) {
        superRequest.get('/users/' + newAdminUser.id).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.user).to.not.equal(null);
          expect(res.body.user.id).to.equal(newAdminUser.id);
          expect(res.body.user.email).to.equal(newAdminUser.email);
          done();
        });
      });

      it('should return not found for invalid user id', function (done) {
        superRequest.get('/users/9999').set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('This user does not exist');
          done();
        });
      });
    });

    describe('Update user attributes PUT /users/:id', function () {
      it('should update user\'s profile when valid user token is supplied', function (done) {
        var updateData = {
          username: 'Olawale',
          lastname: 'Aladeusi',
          password: 'newpassword'
        };
        superRequest.put('/users/' + regularUser.id).send(updateData).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Your profile has been updated');
          expect(res.body.updatedUser.username).to.equal('Olawale');
          expect(res.body.updatedUser.lastname).to.equal('Aladeusi');
          done();
        });
      });

      it('should return error when passing a null field', function (done) {
        superRequest.put('/users/' + regularUser.id).send({ username: '' }).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.errorArray[0].message).to.equal('Input a valid username');
          done();
        });
      });

      it('should return error when updating with an existing username', function (done) {
        superRequest.put('/users/' + regularUser.id).send({ username: _Helper2.default.adminUser.username }).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.errorArray[0].message).to.equal('username already exist');
          done();
        });
      });

      it('should return error when a user want to update id', function (done) {
        superRequest.put('/users/' + regularUser.id).send({ id: 10 }).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You are not permitted to update your id');
          done();
        });
      });

      it('should return not found for invalid user id', function (done) {
        var data = { username: 'wale', lastname: 'ala' };
        superRequest.put('/users/99999').send(data).set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('This user does not exist');
          done();
        });
      });

      it('should return permission denied when regular user want to\n        update another user\'s profile', function (done) {
        var data = { username: 'wale', lastname: 'ala' };
        superRequest.put('/users/' + newAdminUser.id).send(data).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('You are not permitted to update this profile');
          done();
        });
      });

      it('should give admin permission to update any user\'s profile', function (done) {
        var data = { username: 'wale', lastname: 'ala' };
        superRequest.put('/users/' + regularUser.id).send(data).set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Your profile has been updated');
          expect(res.body.updatedUser.username).to.equal('wale');
          expect(res.body.updatedUser.lastname).to.equal('ala');
          done();
        });
      });
    });

    describe('Delete user DELETE /users/:id', function () {
      var newUser = void 0,
          newUSerToken = void 0;
      before(function (done) {
        superRequest.post('/users').send(_Helper2.default.thirdUser).end(function (err, res) {
          newUser = res.body.user;
          newUSerToken = res.body.token;
          done();
        });
      });

      it('should return not found for invalid user id', function (done) {
        superRequest.delete('/users/999').set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.body.message).to.equal('This user does not exist');
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should fail when request is from a regular user', function (done) {
        superRequest.delete('/users/' + regularUser.id).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You are not permitted to perform this action');
          done();
        });
      });

      it('allow admin to delete a user', function (done) {
        superRequest.delete('/users/' + newUser.id).set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('This account has been successfully deleted');
          done();
        });
      });

      it('should not allow a deleted user to access any restricted route', function (done) {
        superRequest.get('/users/').set({ 'x-access-token': newUSerToken }).end(function (err, res) {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Account not found, Sign Up or sign in to get access');
          done();
        });
      });
    });

    describe('SEARCH USERS PAGINATION', function () {
      var arrayUsers = _Helper2.default.usersArray();
      before(function (done) {
        _models2.default.User.bulkCreate(arrayUsers);
        done();
      });

      it('should return search result', function (done) {
        superRequest.get('/users/search?query=\n        ' + arrayUsers[0].firstname.substr(1, 6)).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.body.message).to.equal('Your search was successful');
          done();
        });
      });

      it('should return search result with pagination', function (done) {
        superRequest.get('/users/search?query=\n        ' + arrayUsers[0].firstname.substr(1, 6) + ' \n        ' + arrayUsers[2].firstname.substr(1, 6)).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.body.message).to.equal('Your search was successful');
          expect(res.body.pagination).to.have.property('page_count');
          expect(res.body.pagination).to.have.property('page');
          expect(res.body.pagination).to.have.property('page_size');
          expect(res.body.pagination).to.have.property('total_count');
          done();
        });
      });
    });

    describe('Logout', function () {
      it('should logout successfully', function (done) {
        superRequest.post('/users/logout').set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('You have successfully logged out');
          done();
        });
      });
      it('should not allow user to get user after logout', function (done) {
        superRequest.get('/users').set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Please sign in to access your account');
          done();
        });
      });
    });
  });
});