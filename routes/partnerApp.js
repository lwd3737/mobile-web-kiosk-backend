const express = require('express');
const router = express.Router();

const authController = require(__base + '/controllers/partnerApp/auth');
const roomController = require(__base + '/controllers/partnerApp/room');

router.post('/login', authController.login);

router.get('/rooms', roomController.getRoomList);
router.post('/rooms', roomController.createRoom);
router.get('/rooms/:roomId', roomController.getRoomForm);
router.put('/rooms/:roomId', roomController.modifyRoom);
router.delete('/rooms/:roomId', roomController.deleteRoom);

module.exports = router;