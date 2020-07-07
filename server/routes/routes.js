const express = require('express');
const router = express.Router();
const credentialsController = require('../controllers/credentials-controller.js')

router.get('/', credentialsController.createCredentials);
router.post('/callback', credentialsController.authCredentials);
router.post('/ticketInfo', credentialsController.ticketInfo);
router.get('/getUsers', credentialsController.getUsers);
router.get('/getConcerts', credentialsController.getConcerts);
router.get('/getConcert/:idConcert', credentialsController.getConcertbyId);
router.get('/findUserByDID/:did', credentialsController.findUserByDID);

module.exports = router;