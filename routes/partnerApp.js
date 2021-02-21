const express = require('express');
const router = express.Router();

const authController = require(__base + '/controllers/partnerApp/auth');
const roomController = require(__base + '/controllers/partnerApp/room');

router.post('/login', authController.login);

router.get('/rooms', roomController.getRoomList);
router.post('/rooms', roomController.createRoom);

module.exports = router;