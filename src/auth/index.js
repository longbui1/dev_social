const express = require('express');
const router = express.Router();
const AuthController = require('./authController');

router.post('/login', AuthController.login);

module.exports = router;
