const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/createUser', userController.createUser);
router.post('/activeUser/:id',userController.activeUser)
router.get('/activeUserAgain/:email',userController.activeUserAgain)

module.exports = router;
