require('dotenv').config({ path: `${__dirname}/../.env` });
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const Post = require('../models/Post');

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Cloudinary Config
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const createPost = async (req, res) => {
  const { title, summary, content } = req.body;
  const result = await cloudinary.uploader.upload(req.file.path, {
    transformation: [
      { width: 600, height: 340, crop: "fill" },
      { quality: "auto" },
    ],
  });
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: result.secure_url,
    author: req.user.id,
  });

  // delete the uploaded file from the server
  fs.unlinkSync(`../${req.file.path}`);

  res.json(postDoc);
};

const updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      transformation: [
        { width: 600, height: 340, crop: "fill" },
        { quality: "auto" },
      ],
    });
    newPath = result.secure_url;

    // delete the old file from the server
    console.log(__dirname);
    console.log(req.file.path);
    fs.unlinkSync(req.file.path);
  }

  const { id, title, summary, content } = req.body;
  const postDoc = await Post.findById(id);
  await postDoc.update({
    title,
    summary,
    content,
    cover: newPath ? newPath : postDoc.cover,
  });

  res.json(postDoc);
};

const deletePostById = async (req, res) => {
  const postId = req.params.id; 

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost)
      return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the post" });
  }
}

const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
};

module.exports = { createPost, updatePost, deletePostById, getPosts, getPostById, };