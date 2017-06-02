import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import db from '../../models';
import helper from '../helper/test.helper';
import app from '../../../server';

const secret = process.env.SECRET || 'samplesecret';
const request = supertest(app);
const expect = chai.expect;
const goodUser = helper.regularUser;
const goodUser2 = helper.regularUser2;
const adminUser = helper.adminUser;
const badUser = helper.badUser;
console.log('goodUser', goodUser);


let token;
let userId;
let adminUserToken;
let goodUserToken;
let regularToken;

describe('User API', () => {
  beforeEach((done) => {
    db.Role.bulkCreate(helper.allRoles)
      .then((roles) => {
        adminUser.roleId = roles[0].id;
        db.User.create(adminUser)
          .then(() => {
            db.User.create(goodUser2)
              .then((user) => {
                regularToken = jwt.sign({ id: user.id, roleId: 2 }, secret, {
                  expiresIn: '24h' // expires in 24 hours
                });
                request.post('/users/login')
                  .send(adminUser)
                  .end((err, res) => {
                    adminUserToken = res.body.token;
                    done();
                  });
              });
          });
      });
  });

  after(() => db.Role.destroy({ where: {} }).then(() => { db.User.destroy({ where: {} }); }));

  describe('Create User', () => {
    it('should not create a user with missing fields', (done) => {
      request.post('/users/')
        .send(badUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal(
            'Validation error: Minimum of 8 characters is required,\nValidation error: Input a valid username,\nValidation error: This field cannot be empty,\nValidation error: Input a valid firstname,\nValidation error: This field cannot be empty,\nValidation error: Input a valid lastname,\nValidation error: Input a valid email address');
          done();
        });
    });

    afterEach(() => db.Role.destroy({ where: { } }));

    it('should not allow the creation of a duplicate user', (done) => {
      request.post('/users/')
      .send(goodUser2)
      .end((err, res) => {
        if (err) return err;
        expect(res.status).to.equal(409);
        done();
      });
    });

    it('should not create user with invalid password', (done) => {
      request.post('/users/')
      .send(helper.invalidPasswordUser)
      .end((err, res) => {
        if (err) return err;
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          'Validation error: Minimum of 8 characters is required');
        done();
      });
    });

    it('assigns regular roles to new users', (done) => {
      request.post('/users/')
        .send(helper.newUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(201);
          expect(res.body.newUser.roleId).to.equal(2);
          done();
        });
    });

    it('should create a user with valid credentials', (done) => {
      request.post('/users/')
        .send(goodUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(201);
          expect(res.body.token).to.not.be.undefined;
          done();
        });
    });

    it('should return a token on successful login', (done) => {
      request.post('/users/login')
        .send(adminUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.not.be.undefined;
          done();
        });
    });

    it('should fail to authenticate a user if credentials are invalid',
      (done) => {
        request.post('/users/login')
          .send({})
          .end((err, res) => {
            if (err) return err;
            expect(res.body.message).to.equal(
              'Authentication Failed. Invalid credentials');
            expect(res.status).to.equal(401);
            done();
          });
      });

    describe('Logout User', () =>{
      it('should log out a user successfully', (done) => {
        request.post('/users/logout')
        .send({})
        .end((err, res) => {
          if (err) return err;
          expect(res.body.message).to.equal(
              'You have successfully logged out');
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('Get Users', () => {
      it('should return all users for an admin User', (done) => {
        request.get('/users/')
          .send(adminUser)
          .set('authorization', adminUserToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.users.rows.length).to.equal(res.body.pagination.total_count);
            expect(res.body.message).to.equal('Successfull');
            done();
          });
      });

      after(() => db.User.destroy({ where: {} }));

      it(
        'should return User Not found for a user that does not exist',
        (done) => {
          request.get('/users/20')
            .set('authorization', adminUserToken)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal(
                'User not found');
              done();
            });
        });
    });
  });
});

