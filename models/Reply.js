const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const replySchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: {
    type: String,
    ref: 'User'
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment' // Foreign Key
  },
  reply: String,
}, {
  timestamps: true
})

const Reply = model('Reply', replySchema);

module.exports = Reply;