const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  _id: Schema.Types.ObjectId, // Primary Key
  post: { // One to one relationship - One post and One Comment
    type: Schema.Types.ObjectId,
    ref: 'Post' // Foreign Key
  },
  comment: {
    type: String,
    required: true,
  },
  replies: [{
    type: Schema.Types.ObjectId, // Store a collection of foreign key here
    ref: 'Reply'
  }]
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;