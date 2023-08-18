const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  summary: String,
  content: String,
  cover: String,
  comments: [{ // One to Many Relationship
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;