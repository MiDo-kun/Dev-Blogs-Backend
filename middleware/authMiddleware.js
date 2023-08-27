
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/env-variables');

const authMiddleware = (req, res, next) => {
  const token = (req.headers.authorization).split(' ')[1];
  try {
    jwt.verify(token, SECRET, {}, (err, decoded) => {
      if (err) {
        // Return role and id
        return res.status(401).json({
          '_id': 0,
          'user': false 
        });
      }
      // Add or Modify Authenticated User Object
      req.authenticatedUser = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ "message": "Request Failed." });
  }

};

module.exports = authMiddleware;