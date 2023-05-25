const express = require('express');
const multer = require('multer');

const authMiddleware = require('../middleware/authMiddleware.js');
const postController = require('../controller/postController.js');

const router = express.Router();
const uploadMiddleware = multer({ dest: './uploads' })
router.post('/', uploadMiddleware.single('file'), postController.createPost);

router.put('/', uploadMiddleware.single('file'), postController.updatePost);

router.get('/', postController.getPosts);

router.get('/:id', postController.getPostById);

module.exports = router;