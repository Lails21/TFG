const express = require('express');
const router = express.Router();
const credentialsController = require('../controllers/credentials-controller.js')

router.get('/', credentialsController.createCredentials);
router.post('/callback', credentialsController.authCredentials);
router.post('/ticketInfo', credentialsController.ticketInfo);

module.exports = router;