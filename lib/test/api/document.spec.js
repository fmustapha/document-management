'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _Helper = require('../../helper/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superRequest = _supertest2.default.agent(_config2.default);
var expect = _chai2.default.expect;

var publicD = _Helper2.default.publicDocument;
var privateD = _Helper2.default.privateDocument;
var roleD = _Helper2.default.roleDocument;

var compareDates = function compareDates(firstDate, secondDate) {
  return new Date(firstDate).getTime() <= new Date(secondDate).getTime();
};

describe('DOCUMENT API', function () {
  var adminToken = void 0,
      regularToken = void 0,
      regularToken2 = void 0;
  var regularUser = void 0,
      regularUser2 = void 0;
  var createdDoc = void 0,
      roleDocument = void 0,
      publicDocument = void 0,
      privateDocument = void 0;
  var document = void 0,
      updateDoc = void 0;

  before(function (done) {
    _models2.default.Role.bulkCreate([_Helper2.default.adminRole, _Helper2.default.regularRole]).then(function (roles) {
      _Helper2.default.adminUser.roleId = roles[0].id;
      _models2.default.User.create(_Helper2.default.adminUser).then(function () {
        superRequest.post('/users/login').send(_Helper2.default.adminUser).end(function (err, res1) {
          adminToken = res1.body.token;
          superRequest.post('/users').send(_Helper2.default.regularUser).end(function (err, res2) {
            regularUser = res2.body.user;
            regularToken = res2.body.token;
            superRequest.post('/users').send(_Helper2.default.regularUser2).end(function (err, res3) {
              regularUser2 = res3.body.user;
              regularToken2 = res3.body.token;
              done();
            });
          });
        });
      });
    });
  });

  after(function () {
    _models2.default.Role.destroy({ where: {} });
  });

  describe('CREATE DOCUMENT POST /documents', function () {
    it('should create a new document', function (done) {
      superRequest.post('/documents').send(publicD).set({ 'x-access-token': regularToken }).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.document.title).to.equal(publicD.title);
        expect(res.body.document.ownerId).to.equal(regularUser.id);
        expect(res.body.document.access).to.equal(publicD.access);
        done();
      });
    });

    it('should return varification failed when token is not supplied', function (done) {
      superRequest.post('/documents').send(publicD).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please sign in or register to get a token');
        done();
      });
    });

    it('should not create document when title is not supplied', function (done) {
      var invalidDoc = { content: 'new document' };
      superRequest.post('/documents').send(invalidDoc).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Title field is required');
        done();
      });
    });

    it('should not create document when content is not supplied', function (done) {
      var invalidDoc = { title: 'new document' };
      superRequest.post('/documents').send(invalidDoc).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Content field is required');
        done();
      });
    });

    it('should not create document when an unknow access level is provided', function (done) {
      var invalidDoc = { title: 'hello', content: 'new Andela', access: 'new' };
      superRequest.post('/documents').send(invalidDoc).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Access type can only be public, private or role');
        done();
      });
    });
  });

  describe('Update Document /documents/:id', function () {
    before(function (done) {
      superRequest.post('/documents').send(publicD).set({ 'x-access-token': regularToken }).end(function (err, res) {
        createdDoc = res.body.document;
        done();
      });
    });

    it('should update document when user is the owner', function (done) {
      updateDoc = { title: 'andela' };
      superRequest.put('/documents/' + createdDoc.id).send(updateDoc).set({ 'x-access-token': regularToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.updatedDocument.title).to.equal(updateDoc.title);
        expect(res.body.updatedDocument.content).to.equal(createdDoc.content);
        done();
      });
    });

    it('should allow admin to update document', function (done) {
      updateDoc = { title: 'TIA' };
      superRequest.put('/documents/' + createdDoc.id).send(updateDoc).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.updatedDocument.title).to.equal(updateDoc.title);
        expect(res.body.updatedDocument.content).to.equal(createdDoc.content);
        done();
      });
    });

    it('should not update document when user is not the owner', function (done) {
      updateDoc = { content: 'new life, new culture, new community' };
      superRequest.put('/documents/' + createdDoc.id).send(updateDoc).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You are not permitted to modify this document');
        done();
      });
    });

    it('should not update document when token is not supply', function (done) {
      updateDoc = { content: 'new life, new culture, new community' };
      superRequest.put('/documents/' + createdDoc.id).send(updateDoc).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please sign in or register to get a token');
        done();
      });
    });

    it('should return not found when invalid id is supplied', function (done) {
      updateDoc = { content: 'new life, new culture, new community' };
      superRequest.put('/documents/9999').send(updateDoc).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This document does not exist');
        done();
      });
    });
  });

  describe('Delete Document DELETE /documents/:id', function () {
    beforeEach(function (done) {
      superRequest.post('/documents').send(privateD).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        document = res.body.document;
        done();
      });
    });

    it('should allow document\'s owner to delete document', function (done) {
      superRequest.delete('/documents/' + document.id).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('This document has been deleted successfully');
        done();
      });
    });

    it('should allow admin to delete any document', function (done) {
      superRequest.delete('/documents/' + document.id).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('This document has been deleted successfully');
        done();
      });
    });

    it('should not delete document if requester is not the owner or admin', function (done) {
      superRequest.delete('/documents/' + document.id).set({ 'x-access-token': regularToken }).end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You are not permitted to modify this document');
        done();
      });
    });

    it('should return not found when for invlid id', function (done) {
      superRequest.delete('/documents/999').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This document does not exist');
        done();
      });
    });
  });

  describe('GET document /documents/:id', function () {
    describe('GET document with PRIVATE access', function () {
      before(function (done) {
        superRequest.post('/documents').send(privateD).set({ 'x-access-token': regularToken }).end(function (err, res) {
          privateDocument = res.body.document;
          done();
        });
      });

      it('should ONLY return the document when the user is the owner', function (done) {
        superRequest.get('/documents/' + privateDocument.id).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('You have successfully retrived this document');
          expect(res.body.document.title).to.equal(privateDocument.title);
          expect(res.body.document.access).to.equal('private');
          expect(res.body.document.ownerId).to.equal(regularUser.id);
          done();
        });
      });

      it('should allow admin to retrieve document with private access level', function (done) {
        superRequest.get('/documents/' + privateDocument.id).set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('You have successfully retrived this document');
          expect(res.body.document.title).to.equal(privateDocument.title);
          expect(res.body.document.access).to.equal('private');
          done();
        });
      });

      it('should NOT return document when user is not the owner', function (done) {
        superRequest.get('/documents/' + privateDocument.id).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('You are not permitted to view this document');
          done();
        });
      });
    });

    describe('PUBLIC DOCUMENT', function () {
      before(function (done) {
        superRequest.post('/documents').send(publicD).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
          publicDocument = res.body.document;
          done();
        });
      });

      it('should return document to all users', function (done) {
        superRequest.get('/documents/' + publicDocument.id).set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.document.title).to.equal(publicDocument.title);
          expect(res.body.document.access).to.equal('public');
          expect(res.body.message).to.equal('You have successfully retrived this document');
          done();
        });
      });

      it('should return document not found when invalid id is supplied', function (done) {
        superRequest.get('/documents/99999').set({ 'x-access-token': regularToken }).end(function (err, res) {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('This document cannot be found');
          done();
        });
      });
    });

    describe('ROLE ACCESS DOCUMENT', function () {
      var guestToken = void 0;
      before(function (done) {
        _models2.default.Role.create(_Helper2.default.guestRole1).then(function (guestRole) {
          _Helper2.default.secondUser.roleId = guestRole.id;
          superRequest.post('/users').send(_Helper2.default.secondUser).end(function (error, response) {
            guestToken = response.body.token;
            superRequest.post('/documents').send(roleD).set({ 'x-access-token': regularToken }).end(function (err, res) {
              roleDocument = res.body.document;
              done();
            });
          });
        });
      });

      it('should ONLY return document when user has same role as owner', function (done) {
        superRequest.get('/documents/' + roleDocument.id).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.document.title).to.equal(roleDocument.title);
          expect(res.body.document.access).to.equal('role');
          expect(res.body.message).to.equal('You have successfully retrived this document');
          done();
        });
      });

      it('should allow admin to view all role level access documents', function (done) {
        superRequest.get('/documents/' + roleDocument.id).set({ 'x-access-token': adminToken }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.document.title).to.equal(roleDocument.title);
          expect(res.body.document.access).to.equal('role');
          expect(res.body.message).to.equal('You have successfully retrived this document');
          done();
        });
      });

      it('should not return document if not of the same role level', function (done) {
        superRequest.get('/documents/' + roleDocument.id).set({ 'x-access-token': guestToken }).end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('You are not permitted to view this document');
          done();
        });
      });
    });
  });

  describe('GET ALL DOCUMENT PAGINATION', function () {
    it('should return all documents to admin user', function (done) {
      superRequest.get('/documents').set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('You have successfully retrieved all documents');
        res.body.documents.rows.forEach(function (doc) {
          expect(doc.access).to.be.oneOf(['role', 'private', 'public']);
        });
        done();
      });
    });

    it('should return all documents with pagination', function (done) {
      superRequest.get('/documents?limit=4&offset=3').set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.pagination.page_count).to.equal(2);
        expect(res.body.pagination.page).to.equal(1);
        expect(res.body.pagination.page_size).to.equal(4);
        expect(res.body.pagination.total_count).to.equal(7);
        done();
      });
    });

    it('should return all documents created by a user irrespective of the\n    access level and every other documents with role or puclic access with\n    limit set to 4', function (done) {
      superRequest.get('/documents?limit=4').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(200);
        res.body.documents.rows.forEach(function (doc) {
          if (doc.ownerId === regularUser2.id) {
            expect(doc.access).to.be.oneOf(['role', 'private', 'public']);
          } else {
            expect(doc.access).to.be.oneOf(['role', 'public']);
          }
        });
        done();
      });
    });

    it('should return all documents in descending order of their respective\n      published date', function (done) {
      superRequest.get('/documents').set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        for (var i = 0; i < res.body.documents.rows.length - 1; i += 1) {
          var flag = compareDates(res.body.documents.rows[i].createdAt, res.body.documents.rows[1 + i].createdAt);
          expect(flag).to.equal(false);
        }
        done();
      });
    });
  });

  describe('DOCUMENT SEARCH PAGINATION', function () {
    it('should return search results', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6)).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(200);
        res.body.documents.rows.forEach(function (doc) {
          if (doc.ownerId === regularUser2.id) {
            expect(doc.access).to.be.oneOf(['public', 'role', 'private']);
          } else {
            expect(doc.access).to.be.oneOf(['public', 'role']);
          }
        });
        expect(res.body.message).to.equal('This search was successfull');
        done();
      });
    });

    it('should return all search results to admin', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6)).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        res.body.documents.rows.forEach(function (doc) {
          expect(doc.access).to.be.oneOf(['public', 'role', 'private']);
        });
        done();
      });
    });

    it('should allow multiple search terms', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6) + ' ' + publicD.title.substr(1, 6)).set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(200);
        res.body.documents.rows.forEach(function (doc) {
          if (doc.ownerId === regularUser2.id) {
            expect(doc.access).to.be.oneOf(['public', 'role', 'private']);
          } else {
            expect(doc.access).to.be.oneOf(['public', 'role']);
          }
        });
        done();
      });
    });

    it('should return all documents with pagination', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6) + ' ' + publicD.title.substr(1, 6)).set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.pagination.page_count).to.be.greaterThan(0);
        expect(res.body.pagination.page).to.be.greaterThan(0);
        expect(res.body.pagination.page_size).to.greaterThan(0);
        expect(res.body.pagination.total_count).to.be.greaterThan(0);
        done();
      });
    });

    it('should return "enter search string" when search query is not supplied', function (done) {
      superRequest.get('/documents/search').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter a search query');
        done();
      });
    });

    it('should return error for negative limit', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6) + '&limit=-2').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Only positive number is allowed for limit value');
        done();
      });
    });

    it('should return error for negative offset', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6) + '&limit=2&offset=-2').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Only positive number is allowed for offset value');
        done();
      });
    });

    it('should return error when limit entered is string', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6) + '&limit=aaa').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Only positive number is allowed for limit value');
        done();
      });
    });

    it('should return documents in order of their respective published date', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6) + '&publishedDate=DESC').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        for (var i = 0; i < res.body.documents.rows.length - 1; i += 1) {
          var flag = compareDates(res.body.documents.rows[i].createdAt, res.body.documents.rows[1 + i].createdAt);
          expect(flag).to.equal(false);
        }
        done();
      });
    });

    it('should return documents in ascending order of published date', function (done) {
      superRequest.get('/documents/search?query=\n      ' + publicD.content.substr(2, 6) + '&publishedDate=ASC').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        for (var i = 0; i < res.body.documents.rows.length - 1; i += 1) {
          var flag = compareDates(res.body.documents.rows[i].createdAt, res.body.documents.rows[1 + i].createdAt);
          expect(flag).to.equal(true);
        }
        done();
      });
    });
  });

  describe('Fetch all user\'s document', function () {
    it('should return all documents created by a particular user', function (done) {
      superRequest.get('/users/' + regularUser.id + '/documents').set({ 'x-access-token': regularToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.userDocuments.user.id).to.equal(regularUser.id);
        expect(res.body.userDocuments.documents.rows.length).to.be.greaterThan(0);
        res.body.userDocuments.documents.rows.forEach(function (doc) {
          expect(doc.access).to.be.oneOf(['public', 'role', 'private']);
        });
        done();
      });
    });

    it('should return all documents created by a particular user to admin user', function (done) {
      superRequest.get('/users/' + regularUser.id + '/documents').set({ 'x-access-token': adminToken }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.userDocuments.user.id).to.equal(regularUser.id);
        expect(res.body.userDocuments.documents.rows.length).to.be.greaterThan(0);
        res.body.userDocuments.documents.rows.forEach(function (doc) {
          expect(doc.access).to.be.oneOf(['public', 'role', 'private']);
        });
        done();
      });
    });

    it('should return all public or role access level\n    documents to a requester user', function (done) {
      superRequest.get('/users/' + regularUser.id + '/documents').set({ 'x-access-token': regularToken2 }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.userDocuments.user.id).to.equal(regularUser.id);
        res.body.userDocuments.documents.rows.forEach(function (doc) {
          expect(doc.access).to.be.oneOf(['role', 'public']);
        });
        done();
      });
    });

    it('should return no document found for invalid id', function (done) {
      superRequest.get('/users/0/documents').set({ 'x-access-token': regularToken }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This user does not exist');
        done();
      });
    });
  });
});