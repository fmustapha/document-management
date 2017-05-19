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
    console.log(req.decoded.data);
    if (req.decoded.data.roleId === 1 || String(req.decoded.data.id) === String(req.params.id)) {
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
};

