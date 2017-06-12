import db from '../models/';
import Helper from '../helper/Helper';

export default {

  searchPage(req, res) {
    res.send('You are now on the search page');
  },

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
      .then((user) => {
        if (user.rows.length <= 0) {
          return res.status(404)
            .send({
              message: 'User Not Found',
            });
        }
        const condition = {
          count: user.count,
          limit: req.odmsFilter.limit,
          offset: req.odmsFilter.offset
        };
        delete user.count;
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'This search was successfull',
            user,
            pagination
          });
      })
        .catch(() => res.status(400)
        .send({
          message: 'Error occurred while retrieving users: Invalid parameters'
        }));
  },


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
        delete documents.count;
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
          message: `Error occurred while retrieving
           documents: Invalid parameters`
        }));
  }
};
