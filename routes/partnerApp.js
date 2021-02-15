const express = require('express');
const router = express.Router();

const auth = require(__base + '/controllers/partnerApp/auth');

router.post('/login', auth.login);

module.exports = router;