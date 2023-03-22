const express = require('express');

const authMiddleware = require('../middleware/authMiddleware.js');
const authController = require('../controller/authController.js');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/profile', authMiddleware, authController.profile);

router.post('/logout', authController.logout);

module.exports = router;