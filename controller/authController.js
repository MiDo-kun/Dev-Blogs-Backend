const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

const User = require('../models/User');
const { SALT, SECRET } = require('../utils/config.js');

const register = async (req, res) => {
  try {
    const userDoc = await User.create({
      _id: new mongoose.Types.ObjectId,
      username,
      password: bcrypt.hashSync(password, SALT),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, SECRET, {}, (err, token) => {
      if (err) throw err;
      res.json({
        id: userDoc._id,
        username,
        token,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
};

const profile = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { register, login, profile };