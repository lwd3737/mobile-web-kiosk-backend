const express = require('express');
const router = express.Router();

const partner = require(__base + '/controllers/kioskApp/partner');

router.get('/partner/:partnerId', partner.getPartnerData);

module.exports = router;