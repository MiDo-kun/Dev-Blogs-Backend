const jwt = require('jsonwebtoken');
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
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