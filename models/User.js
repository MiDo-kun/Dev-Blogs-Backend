const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Todo: Add Roles
const UserSchema = new Schema({
  // Add roles, profile, email
  _id: String,
  role: {
    type: String,
    enum: ['admin', 'subscriber'],
  },
  name: String,
  photo: String,
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;