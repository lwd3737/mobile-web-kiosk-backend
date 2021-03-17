const express = require('express');
const router = express.Router();

const authController = require(__base + '/controllers/partnerApp/auth');
const roomsController = require(__base + '/controllers/partnerApp/rooms');
const seatsController = require(__base + '/controllers/partnerApp/seats');


router.post('/login', authController.login);

router.get('/rooms', roomsController.getRoomList);
router.post('/rooms', roomsController.createRoom);
router.get('/rooms/:roomId', roomsController.getRoomForm);
router.put('/rooms/:roomId', roomsController.modifyRoom);
router.delete('/rooms/:roomId', roomsController.deleteRoom);

router.get('/rooms/:roomId/seats', seatsController.getSeats);
router.post('/rooms/:roomId/seats', seatsController.createSeats);
router.put('/rooms/:roomId/seats', seatsController.modifySeats);

module.exports = router;