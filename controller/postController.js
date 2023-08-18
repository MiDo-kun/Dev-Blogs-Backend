require('dotenv').config({ path: `${__dirname}/../.env` });
const { default: mongoose } = require('mongoose');

const Post = require('../models/Post');
const { uploadImage, removeImage } = require('../utils/cloudinary.js');

async function createPost(req, res) {
  const { title, summary, content } = req.body; // JSON Data

  try {
    const id = new mongoose.Types.ObjectId();
    const file = req.file.path;

    const imageURL = await uploadImage(id, file);
    const postDoc = await Post.create({
      _id: id,
      title,
      summary,
      content,
      cover: imageURL,
    });

    return res.status(200).json(postDoc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Request Failed." });
  }
};

async function updatePost(req, res) {
  const { id, title, summary, content } = req.body;
  let newPath = null;

  try {
    if (req.file) {
      const image = req.file.path;
      const imageURL = await uploadImage(id, image)
      newPath = imageURL;
      removeImage(id);
    }

    const postDoc = await Post
      .findById(id)
      .update({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      })
    return res.status(200).json(postDoc)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ "message": "Request Failed" });
  }

};

async function deletePostById(req, res) {
  const { postId } = req.params;
  try {
    await Post.findByIdAndDelete(postId)
    removeImage(postId);
    return res.status(200).json({ "message": "Post Removed." })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Request Failed." });
  }
}

async function getPosts(req, res) {
  const paginateOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 5
  }

  try {
    const postDoc = await Post.find()
      .skip(paginateOptions.page * paginateOptions.limit)
      .limit(paginateOptions.limit)
      .populate({
        path: 'comments',
        populate: {
          path: 'replies',
        },
        select: '_id comment replies'
      }).select('-__v -updatedAt'); // -(dash) means exclude 
    return res.status(200).json(postDoc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Request Failed." });
  }
};

async function getPostById(req, res) {
  const { postId } = req.params;

  try {
    const postDoc = await Post.findById(postId)
      .populate({
        path: 'comments',
        populate: {
          path: 'replies'
        }
      })

    return res.status(200).json(postDoc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Request Failed." });
  }

};

module.exports = { createPost, updatePost, deletePostById, getPosts, getPostById };