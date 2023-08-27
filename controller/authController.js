const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

const User = require('../models/User');
const { SALT, SECRET, FRONT_END_URL } = require('../config/env-variables.js');

async function register(req, res) {
  try {
    const userDoc = await User.create({
      _id: new mongoose.Types.ObjectId,
      username,
      password: bcrypt.hashSync(password, SALT),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
};

async function login(req, res) {
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

function profile(req, res) {
  res.status(200).json({
    _id: req.authenticatedUser._id,
    user: req.authenticatedUser.role
  })
};

function googleCallBack(req, res) {
  try {
    const token = jwt.sign({
      _id: req.user._id,
      role: req.user.role,
      name: req.user.name,
      photo: req.user.photo
    }, SECRET, { expiresIn: '5h' })
    res.redirect(`${FRONT_END_URL}/success?token=${token}`);
  } catch (err) {
    res.status(500).json({ "message": "Request Failed." })
  }
}


module.exports = { register, login, profile, googleCallBack };