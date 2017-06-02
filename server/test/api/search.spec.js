import request from 'supertest';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import helper from '../helper/test.helper';
import server from '../../../server';
import db from '../../models';
import app from '../../config/config';

const secret = process.env.SECRET || 'samplesecret';
const superRequest = request(server);
const expect = chai.expect;


describe('Search API', () => {
  let adminDetails;
  let regularDetails;
  let adminToken;
  let regularToken;


  beforeEach((done) => {
    console.log('We got here!')
    console.log(helper.adminUser);
    db.Role.bulkCreate([helper.adminRole, helper.regularRole])
      .then((roles) => {
        db.User.create(helper.adminUser)
          .then((user) => {
            console.log(user, '<=== user');
            adminToken = jwt.sign({ id: user.id, roleId: 1 }, secret, { expiresIn: '24h' });
            db.User.create(helper.regularUser)
              .then((user) => {
                regularToken = jwt.sign({ id: user.id, roleId: 2 }, secret, { expiresIn: '24h' });
                done();
              }).catch((error) => {
                return error;
              });
          }).catch((error) => {
            return console.log(error);
          });
      });
  });

  after((done) => {
    db.Role.destroy({ where: {} })
      .then(() => {
        db.User.destroy({ where: {} })
          .then(() => {
            done();
          });
      });

          // .then(() => {
          //   db.Document.destroy({ where: {} })
          //     .then(() => {
          //       done();
          //     });
          // });
  });

  describe('User Search', () => {
    it('Should return a list of users based on search criteria', (done) => {
      superRequest.get(`/search/users/?term=${helper.adminUser.username}`)
        .set('authorization', adminToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body.user.rows[0].username).to.equal(helper.adminUser.username);
          expect(res.body.message).to.equal('This search was successfull');
          done();
        });
    });

    it('Should return users not found, when the search criteria matched no data', (done) => {
      server
        .get('/search/users/?term=zu')
        .set('authorization', adminToken)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).to.equal('Users Not Found');
          done();
        });
    });

    // it('Should return error for non-admin search', (done) => {
    //   server
    //     .get('/search/users/?term=r')
    //     .set({ 'x-access-token': regularDetails.token })
    //     .end((err, res) => {
    //       expect(res.body.message)
    //       .toEqual('User is unauthorized for this request.');
    //       done();
    //     });
    // });
  });

  // describe('Document Search', () => {
  //   it('Should return a list of documents based on search criteria', (done) => {
  //     server
  //       .get('/search/documents/?term=test')
  //       .set({
  //         'x-access-token': adminDetails.token
  //       })
  //       .end((err, res) => {
  //         expect(res.body).toExist('title');
  //         if (res.body.message) {
  //           expect(res.body.message).toEqual('Documents Not Found');
  //         }
  //         done();
  //       });
  //   });

  //   it('Should return documents not found', (done) => {
  //     server
  //       .get('/search/documents/?term=zu')
  //       .set({
  //         'x-access-token': adminDetails.token
  //       })
  //       .end((err, res) => {
  //         expect(res.status).toEqual(404);
  //         expect(res.body.message).toEqual('Documents Not Found');
  //         done();
  //       });
  //   });

  //   xit('Should return error for non-admin search', (done) => {
  //     server
  //       .get('/search/documents/?term=in')
  //       .set({ 'x-access-token': regularDetails.token })
  //       .end((err, res) => {
  //         expect(res.body.message)
  //         .toEqual('User is unauthorized for this request.');
  //         done();
  //       });
  //   });
  // });
});
