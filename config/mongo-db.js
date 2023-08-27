const mongoose = require("mongoose");
const { MONGODB_URI } = require('./env-variables');

function connect() {

  mongoose.set('strictQuery', true);
  mongoose.connect(MONGODB_URI).catch(err => console.log(err.message));
}

module.exports = { connect };