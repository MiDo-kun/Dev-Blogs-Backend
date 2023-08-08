require('dotenv').config({ path: `${__dirname}/.env` });

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = (req.headers.authorization).split(' ')[1];

  if (token == 'undefined') {
    return res.status(204).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secret, {}, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;