import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'samplesecret';

export default {

  verifyToken(req, res, next) {
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
    if (req.decoded.data.roleId === 1) {
      next();
    } else {
      return res.status(403).send({
        message: 'Access denied'
      });
    }
  },

  authorizeOwner(req, res, next) {
    // const token = req.headers.authorization;
    // const decoded = jwt.decode(token);
    if (String(req.decoded.data.id) === req.params.id) {
      next();
    } else {
      return res.status(403).send({
        message: 'Access denied'
      });
    }
  }
};

