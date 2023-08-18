const express = require('express');
const multer = require('multer');

const authMiddleware = require('../middleware/authMiddleware.js');
const postController = require('../controller/postController.js');
const commentController = require('../controller/commentController.js');

const router = express.Router();
const uploadMiddleware = multer({ dest: './uploads' })

// <-- POST ROUTES --> //
router.post('/', authMiddleware, uploadMiddleware.single('file'), postController.createPost);
router.put('/', authMiddleware, uploadMiddleware.single('file'), postController.updatePost);
router.get('/', postController.getPosts);
router.get('/:postId', postController.getPostById);
router.delete('/:postId', authMiddleware, postController.deletePostById);

// <-- COMMENT ROUTES --> //
router.get("/:postId/comment", commentController.getComments);
router.post("/:postId/comment", authMiddleware, commentController.createComment);
router.delete("/:postId/comment/:commentId", authMiddleware, commentController.removeCommentById);

// <-- REPLY ROUTES --> //
router.get("/:postId/comment/:commentId", commentController.getReplies)
router.post("/:postId/comment/:commentId/reply/", authMiddleware, commentController.replyComment);
router.delete("/:id/comment/:commentId/reply/:replyId", authMiddleware, commentController.removeCommentById);

module.exports = router;