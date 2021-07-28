const express = require('express');
const router = express.Router();
const roleController = require('./userController');

router.post('/createUser', roleController.createUser);

module.exports = router;
