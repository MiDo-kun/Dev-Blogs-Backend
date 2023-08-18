const { default: mongoose } = require('mongoose');
const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const Reply = require('../models/Reply.js');

async function getComments(req, res) {
  try {
    const commentDoc = await Comment.find()
      .populate('post')
      .populate('replies');
    return res.status(200).json(commentDoc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "Request Failed" });
  }
}

async function createComment(req, res) {
  const { postId } = req.params;

  try {
    const commentDoc = await Comment.create({
      _id: new mongoose.Types.ObjectId(),
      post: postId,
      comment: "Hi There! Its populated"
    });

    const postDoc = await Post.findById(postId);
    postDoc.comments.push(commentDoc._id);
    postDoc.save();

    return res.status(200).json(commentDoc);
  } catch (err) {
    console.log(err);
    return res.send(500).json({ "message": "Request Failed" });
  }

}

async function removeCommentById(req, res) {
}

async function getReplies(req, res) {

}

async function replyComment(req, res) {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const replyDoc = await Reply.create({ _id: new mongoose.Types.ObjectId(), reply: content })

    const commentDoc = await Comment.findById(commentId);
    commentDoc.replies.push(replyDoc._id);
    commentDoc.save()

    return res.status(200).json(replyDoc);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ "message": "Request Failed." });
  }

}

async function removeCommentById(req, res) {

}


module.exports = { getComments, createComment, removeCommentById, getReplies, replyComment, removeCommentById };