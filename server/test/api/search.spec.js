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
  let docTitle;


  beforeEach((done) => {
    db.Role.bulkCreate([helper.adminRole, helper.regularRole])
      .then((roles) => {
        db.User.create(helper.adminUser)
          .then((user) => {
            adminDetails = user;
            adminToken = jwt.sign({ id: user.id, roleId: 1 }, secret, { expiresIn: '24h' });
            db.User.create(helper.regularUser)
              .then((user) => {
                regularToken = jwt.sign({ id: user.id, roleId: 2 }, secret, { expiresIn: '24h' });
                db.Document.create({ ...helper.publicDocument, ownerId: user.id })
                  .then((doc) => {
                    docTitle = doc.title;
                    done();
                  });
              }).catch((error) => {
                return error;
              });
          }).catch((error) => {
          });
      });
  });

  afterEach((done) => {
    db.Role.destroy({ where: {} })
      .then(() => {
        db.User.destroy({ where: {} })
          .then(() => {
            done();
          });
      });
  });

  describe('User Search', () => {
    it('Should return a list of users based on search criteria', (done) => {
      superRequest.get(`/search/users/?term=${helper.adminUser.username}`)
        .set('authorization', adminToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body.users.rows[0].username).to.equal(helper.adminUser.username);
          expect(res.body.message).to.equal('This search was successfull');
          done();
        });
    });

    it('Should return users not found, when the search criteria matched no data', (done) => {
      superRequest
        .get('/search/users/?term=zu')
        .set('authorization', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User Not Found');
          done();
        });
    });

    it('Should not allow regular users search for users', (done) => {
      superRequest
        .get('/search/users/?term=r')
        .set('authorization', regularToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('Document Search', () => {
    it('Should return a list of documents based on search criteria', (done) => {
      superRequest
        .get(`/search/documents/?term=${docTitle}`)
        .set('authorization', adminToken)
        .end((err, res) => {
          expect(res.body.documents.rows[0].title).to.not.be.undefined;
          expect(res.body.documents.rows[0].content).to.not.be.undefined;
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('This search was successfull');
          done();
        });
    });

    // it('Should return documents not found', (done) => {
    //   superRequest
    //     .get('/search/documents/?term=z')
    //     .set('authorization', regularToken)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(404);
    //       expect(res.body.message).to.equal('Document(s) Not Found');
    //       done();
    //     });
    // });

    // it.only(`Should return error when users
    // try to search for other users private documents`,
    //  (done) => {
    //    db.Document.create({ ...helper.privateDocument, ownerId: adminDetails.id })
    //    .then((doc) => {
    //      superRequest
    //         .get(`/search/documents/?term=${doc.title}`)
    //         .set('authorization', jwt.sign({ id: 99, roleId: 2 }, secret, { expiresIn: '24h' }))
    //         .end((err, res) => {
    //           console.log('resbody', res.body);
    //           res.body.document.rows.forEach((document) => {
    //             expect(document.access).to.not.eql('private');
    //           });
    //           done();
    //         });
    //    });
    //  });
  });
});
