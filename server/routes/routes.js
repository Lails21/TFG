const express = require('express');
const router = express.Router();
const credentialsController = require('../controllers/credentials-controller.js')

router.get('/', credentialsController.createCredentials);
router.get('/ask', credentialsController.askVerification)
router.post('/callback', credentialsController.authCredentials);
router.post('/ticketInfo', credentialsController.ticketInfo);
router.post('/verify', credentialsController.verifyCredentials);
router.get('/getUsers', credentialsController.getUsers);
router.get('/getConcerts', credentialsController.getConcerts);
router.get('/getConcert/:idConcert', credentialsController.getConcertbyId);
router.get('/findUserByDID/:did', credentialsController.findUserByDID);
router.post('/updateUser', credentialsController.updateUser);

module.exports = router;