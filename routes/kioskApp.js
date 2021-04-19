const express = require('express');
const router = express.Router();

const partner = require(__base + '/controllers/kioskApp/partner');
const rooms = require(__base + '/controllers/kioskApp/rooms');
const seats = require(__base + '/controllers/kioskApp/seats');

router.get('/partner/:partnerId', partner.getPartnerData);

router.get('/:partnerId/rooms', rooms.getRoomList);

router.get('/:partnerId/rooms/:roomId/seats', seats.getSeatList);

module.exports = router;