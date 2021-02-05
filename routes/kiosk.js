const express = require('express');
const router = express.Router();

const { partner } = require(__base + '/controllers/kiosk');

router.get('/:partnerId', partner.getPartnerData);

module.exports = router;