require('dotenv').config({ path: `${__dirname}/.env` });

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = (req.headers.authorization).split(' ')[1];
  try {
    jwt.verify(token, secret, {}, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'User Unauthorized' });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ "message": "Request Failed." });
  }

};

module.exports = authMiddleware;