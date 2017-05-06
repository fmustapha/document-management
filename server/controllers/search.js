import util from 'util';
import db from '../models/';
import Helpers from '../helper/Helper';

export default {

  searchPage(req, res) {
    res.send('You are now on the search page');
  },
  userSearch(req, res) {
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    if (limit === 'undefined') {
      limit = 10;
    }
    if (offset === 'undefined') {
      offset = 0;
    }
    const query = req.query.term;
    const nextOffset = offset + limit;
    const previousOffset = (offset - limit < 1) ? 0 : offset - limit;
    return db.User
      .findAll({
        where: {
          $or: [
            { email: {
              $iLike: `%${req.query.term}%`
            },
              username: {
                $iLike: `%${req.query.term}%`
              } }
          ]
        }
      })
      .then((user) => {
        if (user.length <= 0) {
          return res.status(404)
            .send({
              message: 'Users Not Found',
            });
        }
        const meta = {
          limit,
          next: util.format(
            '?term=%s&limit=%s&offset=%s', query, limit, nextOffset),
          offset,
          previous: util.format(
            '?term=%s&limit=%s&offset=%s', query, limit, previousOffset),
          total_count: user.length
        };
        const condition = { user, offset, limit, count: user.length };
        const result = Helpers.pagination(condition);
        return res.status(200).send({
          user: user, result, pageMeta: meta });
      })
    .catch(error => res.status(400).send({
      error,
      message: 'Error occurred while retrieving Users'
    }));
  },

  documentSearch(req, res) {
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    if (limit === 'undefined') {
      limit = 10;
    }
    if (offset === 'undefined') {
      offset = 0;
    }
    const query = req.query.term;
    const nextOffset = offset + limit;
    const previousOffset = (offset - limit < 1) ? 0 : offset - limit;
    return db.Document
      .findAll({
        where: {
          $or: [{ title: { $iLike: `%${req.query.term}%` } },
            { content: { $iLike: `%${req.query.term}%` } }]
        }
      })
      .then((document) => {
        if (document.length <= 0) {
          return res.status(404)
            .send({
              message: 'Documents Not Found',
            });
        }
        const meta = {
          limit,
          next: util.format(
            '?term=%s&limit=%s&offset=%s', query, limit, nextOffset),
          offset,
          previous: util.format(
            '?term=%s&limit=%s&offset=%s', query, limit, previousOffset),
          total_count: document.length
        };
        const condition = { document, offset, limit, count: document.length };
        const result = Helpers.pagination(condition);
        return res.status(200)
          .send({ document, result, pageMeta: meta });
      })
      .catch(error => res.status(400)
        .send({
          error,
          message: 'Error occurred while retrieving documents'
        }));
  }
};
