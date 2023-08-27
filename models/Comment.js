const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  _id: Schema.Types.ObjectId, // Primary Key
  user: {
    type: String,
    ref: 'User'
  },
  post: { // One to one relationship - One post to One Comment
    type: Schema.Types.ObjectId,
    ref: 'Post' // Foreign Key
  },
  comment: {
    type: String,
    required: true,
  },
  replies: [{
    type: Schema.Types.ObjectId, // Store a collection of foreign key here
    ref: 'Reply' // Referenced to reply collections
  }]
}, {
  timestamps: true
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;