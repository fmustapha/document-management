import db from '../models/';
import Helper from '../helper/Helper';

const Search = {

  searchPage(req, res) {
    res.send('You are now on the search page');
  },

/**
  * Search Users
  * Route: GET:
  * search/users/?term=[username]
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  userSearch(req, res) {
    return db.User
      .findAndCountAll({
        where: {
          username: {
            $iLike: `%${req.query.term}%`
          }
        },
        attributes: ['id', 'username',
          'firstname', 'lastname',
          'email', 'roleId', 'active', 'createdAt', 'updatedAt']
      })
      .then((users) => {
        if (users.rows.length <= 0) {
          return res.status(404)
            .send({
              message: 'User Not Found',
            });
        }
        const condition = {
          count: users.count,
          limit: req.odmsFilter.limit,
          offset: req.odmsFilter.offset
        };
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'This search was successfull',
            users: { rows: users.rows },
            pagination,
            totalUsers: users.count
          });
      })
        .catch(() => res.status(400)
        .send({
          message: 'Error occurred while retrieving users: Invalid parameters'
        }));
  },

/**
  * Search documents
  * Route: GET: search/documents/?term=[string]
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  documentSearch(req, res) {
    return db.Document
     .findAndCountAll(req.odmsFilter)
      .then((documents) => {
        if (documents.rows.length <= 0) {
          return res.status(404)
            .send({
              message: 'Document(s) Not Found',
            });
        }
        const condition = {
          count: documents.count,
          limit: req.odmsFilter.limit,
          offset: req.odmsFilter.offset
        };
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'This search was successfull',
            documents,
            pagination
          });
      })
        .catch(() => res.status(400)
        .send({
          message: 'Connection refused: Invalid parameters supplied'
        }));
  }
};

export default Search;
