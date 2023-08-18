const express = require('express');

const authMiddleware = require('../middleware/authMiddleware.js');
const authController = require('../controller/authController.js');

const router = express.Router();

// <-- AUTHENTICATION ROUTES --> //
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.profile);

module.exports = router;