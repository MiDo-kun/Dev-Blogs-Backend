const { default: mongoose } = require('mongoose');
const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const Reply = require('../models/Reply.js');

async function getComments(req, res) {
  const { postId } = req.params;
  try {
    const commentDoc = await Comment
      .find({ post: postId })
      .populate('user', '_id name photo')
      .sort({ createdAt: -1 })
      .select("_id comment updatedAt")
    return res.status(200).json(commentDoc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "Request Failed" });
  }
}

async function createComment(req, res) {
  const { postId } = req.params;
  const { comment } = req.body;
  const userId = req.authenticatedUser._id;

  try {
    const commentDoc = await Comment.create({
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      post: postId,
      comment: comment
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
  const { commentId } = req.params;

  try {
    await Comment.deleteOne({ _id: commentId });
    await Reply.deleteMany({ comment: commentId })
    return res.sendStatus(200);
  } catch (err) {
    return res.send(500).json({ "message": "Request Failed" });
  }
}

async function getReplies(req, res) {
  const { commentId } = req.params;

  try {
    const replyDoc = await Reply.find({ comment: commentId })
      .populate('user', '_id name photo')
      .sort({ createdAt: -1 })
      .select("_id reply updatedAt");
    return res.status(200).json(replyDoc);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ "message": "Request Failed." });
  }
}

async function replyComment(req, res) {
  const { commentId } = req.params;
  const { reply } = req.body;
  const userId = req.authenticatedUser._id;

  try {
    const replyDoc = await Reply.create({
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      comment: commentId,
      reply: reply
    })

    const commentDoc = await Comment.findById(commentId);

    commentDoc.replies.push(replyDoc._id);
    commentDoc.save()

    return res.status(200).json(replyDoc);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ "message": "Request Failed." });
  }

}

async function removeReply(req, res) {
  const { replyId } = req.params;

  try {
    await Reply.deleteOne({ _id: replyId });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ "message": "Request Failed" });
  }
}


module.exports = { getComments, createComment, removeCommentById, getReplies, replyComment, removeReply };