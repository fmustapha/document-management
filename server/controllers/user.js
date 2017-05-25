import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import db from '../models';
import auth from '../middlewares/auth';
import Helper from '../helper/Helper';


const secret = process.env.SECRET || 'samplesecret';

export default {

  // /**
  //  *
  //  *
  //  * @param {any} req
  //  * @param {any} res
  //  * @returns {Object} list of users or error message
  //  * if unsuccessful
  //  */
  // getAllUsers(req, res) {
  //   return db.User.findAll({})
  //     .then(users => res.status(200).send({
  //       message: 'Successfull',
  //       users
  //     }))
  //     .catch(error => res.status(400).send({
  //       error
  //     }));
  // },

  /**
    * Get all users
    * Route: GET: /users
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  getAllUsers(req, res) {
    return db.User
      .findAndCountAll(req.odmsFilter)
      .then((users) => {
        if (users) {
          const condition = {
            count: users.count,
            limit: req.odmsFilter.limit,
            offset: req.odmsFilter.offset
          };
          delete users.count;
          const pagination = Helper.pagination(condition);
          res.status(200)
            .send({
              message: 'Successfull',
              users,
              pagination
            });
        }
      });
  },

  /**
   * Get one user by id
   * Route: GET: /users/:id
   * @param {Object} req
   * @param {Object} res
   * @returns {void|Response} containing user details if successful
   */
  getOneUser(req, res) {
    return db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200)
        .send({
          message: 'Successful',
          user
        });
      })
      .catch(error => res.status(400).json({
        error
      }));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {Object} containing pagination limit
   */
  getUserPagination(req, res) {
    return db.User.findAll({
      limit: 10
    })
      .then(limit => res.status(200).json({
        message: 'Successfull',
        limit
      }))
      .catch(error => res.status(400).json({
        error
      }));
  },

  /**
    * Get all user's documents by user id
    * Route: GET: /users/:id/documents
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  getUserDocuments(req, res) {
    db.Document.findAll({
      where: {
        ownerId: req.params.id
      }
    }).then(documents => res.status(200)
      .json({
        message: 'Successfull',
        documents
      })).catch((error) => {
        res.status(400)
        .send(error);
      });
  },

  /**
   * Create a new user
   * Route: POST: /users
   * @returns {void|Response} response object or void
   * a message
   * @param {Object} req
   * @param {Object} res
   */
  createUser(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (user) {
        return res.status(409).send({
          message: 'User already exists'
        });
      }
      db.User.create(req.body)
        .then((newUser) => {
          const token = jwt.sign({
            data: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email,
              password: newUser.password,
              roleId: newUser.roleId
            }
          }, secret, {
            expiresIn: '24h' // expires in 24 hours
          });
          res.status(200)
            .send({
              token,
              newUser: newUser.username,
              id: newUser.id,
              message: 'User has been successfully created'
            });
        })
        .catch((error) => {
          res.status(400)
            .send(error);
        });
    });
  },

  /**
   * login
   * Route: POST: /users/login
   * @return {void|Response} response object or void
   * a message
   * @param {Object} req
   * @param {Object} res
   */
  login(req, res) {
    db.User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication Failed. User not found.',
          });
        }
        // check if password matches
        if (!user.validPassword(req.body.password)) {
          return res.status(401).send({
            message: 'Authentication Failed. Wrong password.'
          });
        }
        const token = jwt.sign({
          data: {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            roleId: user.roleId
          }
        }, secret, {
          expiresIn: '24h' // expires in 24 hours
        });
        return res.status(200).send({
          message: 'User authenticated successfully',
          user: user.username,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          id: user.id,
          token
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'User was not authenticated'
      }));
  },

  /**
    * logout
    * Route: POST: /users/logout
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  logout(req, res) {
    return res.status(200).send({
      message: 'You have successfully logged out'
    });
  },

  /**
    * Update user attribute
    * Route: PUT: /users/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  updateUser(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return user.update({
          firstname: req.body.name || user.firstname,
          lastname: req.body.lastname || user.lastname,
          username: req.body.username || user.username,
          email: req.body.email || user.email,
          password: bcrypt.hashSync(req.body.password,
                bcrypt.genSaltSync(10)) || user.password,
          roleId: req.body.roleId || user.roleId
        })
          .then((updatedUser) => {
            res.status(200).json({
              message: 'User role updated',
              updatedUser:
              { firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                username: updatedUser.username,
                email: updatedUser.email,
                roleId: updatedUser.roleId
              }
            });
          })
          .catch(error => res.status(400).send({
            error
          }));
      })
      .catch(error => res.status(400).send({
        error
      }));
  },

  /**
   *
   * @returns {Object} containing response status and
   * a message
   * @param {any} req
   * @param {any} res
   */
  activeUser(req, res) {
    db.User.findById(req.decoded.id)
    .then(user =>
    res.status(200).send({ user }))
    .catch(error => res.status(400).send({
      error
    }));
  },

  /**
    * Delete a user by id
    * Route: DELETE: /users/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  deleteUser(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User does not exist'
          });
        }
        return user.destroy().then(res.status(200)
          .send({
            message: 'User successfully deleted'
          }));
      })
      .catch(error => res.status(400).send(error));
  }
};

