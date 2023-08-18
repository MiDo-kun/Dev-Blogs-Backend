const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const replySchema = new Schema({
  _id: Schema.Types.ObjectId,
  reply: String,
})

const Reply = model('Reply', replySchema);

module.exports = Reply;