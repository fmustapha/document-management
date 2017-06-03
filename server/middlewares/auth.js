import jwt from 'jsonwebtoken';
import Helper from '../helper/Helper';

const secret = process.env.SECRET || 'samplesecret';

export default {

  verifyToken(req, res, next) {
    console.log('verify token');
    const token =
      req.headers.authorization ||
      req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403)
            .send({
              message: 'Token Authentication failed'
            });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        message: 'No token provided'
      });
    }
  },

  authorizeAdmin(req, res, next) {
    const roleId = req.decoded.roleId || req.decoded.data.roleId;
    const id = req.decoded.id || req.decoded.data.id;
    console.log(roleId);
    if (parseInt(roleId, 10) === 1 ||
     String(id) === String(req.params.id)) {
      next();
    } else {
      return res.status(403).send({
        message: 'Access denied'
      });
    }
  },

  authorizeOwner(req, res, next) {
    if (String(req.decoded.data.id) === String(req.params.id)) {
      next();
    } else {
      return res.status(403).send({
        message: 'Access denied'
      });
    }
  },

/**
   * Validate search
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateSearch(req, res, next) {
    console.log('va;idate search');
    const query = {};
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const publishedDate = req.query.publishedDate;
    const order =
      publishedDate && publishedDate === 'ASC' ? publishedDate : 'DESC';

    if (!Helper.checkQuery(limit) || !Helper.checkQuery(offset)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for limit value'
        });
    }
    query.limit = limit;
    query.offset = offset;
    query.order = [['createdAt', order]];
    req.odmsFilter = query;
    next();
  },
};

