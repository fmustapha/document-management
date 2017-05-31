import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import db from '../../models';
import helper from '../helper/test.helper';

const expect = chai.expect;
const request = supertest(app);
const userParams = helper.adminUser;
const roleParams = helper.adminRole;
const regularRole = helper.regularRole;

let role,
  token;


describe('Role API', () => {
  beforeEach((done) => {
    db.Role.destroy({ where: {} })
      .then(() => {
        db.Role.create(roleParams)
          .then((newRole) => {
            userParams.roleId = newRole.id;
            db.User.create(userParams)
              .then(() => {
                request.post('/users/login')
                  .send(userParams)
                  .end((err, res) => {
                    if (err) return err;
                    token = res.body.token;
                    done();
                  });
              });
          }).catch((err) => null);
      });
  });

  after(() => db.Role.destroy({ where: {} }));

  describe('Create new Role', () => {
    beforeEach((done) => {
      db.Role.findAll({ where: {} })
        .then(() => {
          db.Role.create(regularRole)
            .then((newRole) => {
              role = newRole;
              done();
            });
        });
    });

    afterEach(() => db.Role.destroy({ where: { } }));

    it('should return unauthorised without a token', (done) => {
      request.get('/roles/')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal(
            'No token provided');
          done();
        });
    });


    it('should return all roles to an admin user', (done) => {
      request.get('/roles/')
        .set({ Authorization: token })
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should not create a new role if title fields is missing', () => {
      request.post('/roles/')
      .set({ Authorization: token })
      .send({})
      .end((err, response) => {
        expect(response.status).to.equal(403);
      });
    });

    it('should not create a role that already exists', () => {
      request.post('/roles/')
          .set({ Authorization: token })
          .send({ title: 'admin' })
          .expect(400)
          .end((err, response) => {
            expect(response.status).to.equal(400);
          });
    });

    it('should fail for invalid attributes', () => {
      request.post('/roles/')
        .send({ name: 'hello' })
        .set({ Authorization: token })
        .end((err, response) => {
          expect(response.status).to.equal(403);
        });
    });

    it('should return the correct role when a valid id is passed', (
      done) => {
      request.get(`/roles/${role.id}`)
        .set({ Authorization: token })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should update an existing role', (done) => {
      request.put(`/roles/${role.id}`)
        .send({ title: 'role' })
        .set({ Authorization: token })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should delete a role', (done) => {
      request.delete(`/roles/${role.id}`)
        .set({ Authorization: token })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
});
