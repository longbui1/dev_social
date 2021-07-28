const express = require('express');
const router = express.Router();
const roleController = require('./roleController');

router.post('/createRole', roleController.createRole);

module.exports = router;
