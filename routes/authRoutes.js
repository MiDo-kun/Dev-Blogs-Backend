const passport = require('passport');
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware.js');
const authController = require('../controller/authController.js');

const router = express.Router();

// <-- AUTHENTICATION ROUTES --> //
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.profile);

// <-- PASSPORT GOOGLE STRATEGY ROUTE --> //
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.googleCallBack);

module.exports = router;