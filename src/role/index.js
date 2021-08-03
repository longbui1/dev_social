const express = require('express');
const router = express.Router();
const roleController = require('./roleController');

router.get('/:roleId', roleController.getRole);
router.post('/createRole', roleController.createRole);
router.put('/updateRole/:id', roleController.updateRole);

module.exports = router;
