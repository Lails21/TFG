const express = require('express');
const ngrok = require('ngrok');
const decodeJWT = require('did-jwt').decodeJWT;
const transports = require('uport-transports').transport;
const message = require('uport-transports').message.util;
const {Credentials} = require('uport-credentials');
const DidRegistryContract = require('ethr-did-registry');
const Contract = require('@truffle/contract');
const {Resolver} = require ('did-resolver');
const {getResolver} = require('ethr-did-resolver');
const app = express();
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();
var socketHelper = require('../socket_helper.js');

const User = require('../models/user');
const Concert = require('../models/concert');

const credentialsController = {};
const invalidConcerts = [];
var ticketInfo;
var infoValidation;
const providerConfig = { rpcUrl: 'https://rinkeby.infura.io/ethr-did'}
const ethrDidResolver = getResolver(providerConfig)


// setup Credentials object with newly created application identity.
const credentials = new Credentials({
    appName: 'Cibertickets',
    did: 'did:ethr:0x623fe050f3873b5c540ed97a8a6006ebc34db1d1',
    privateKey: '3d17f935cc9eb1b9c48e7b68fd51c449ac55442fb7eb0b4a8fc30515dcb3d1ac',
    resolver: new Resolver(ethrDidResolver)
  })

credentialsController.createCredentials = (req, res) => {
    credentials.createDisclosureRequest({
      requested: ["name"],
      notifications: true,
      callbackUrl: endpoint + '/callback'
    }).then(requestToken => {
      console.log('REQUEST TOKEN CODED');
      console.log(requestToken);
      console.log('REQUEST TOKEN DECODED');
      console.log(decodeJWT(requestToken))  //log request token to console
      const uri = message.paramsToQueryString(message.messageToURI(requestToken), {callback_type: 'post'})
      const qr =  transports.ui.getImageDataURI(uri)
      res.send({"qr": qr});
    })
}

credentialsController.askVerification = (req, res) => {
  credentials.createDisclosureRequest({
    verified: ['Concert'],
    callbackUrl: endpoint + '/verify'
  }).then(requestToken => {
    console.log(decodeJWT(requestToken))  //log request token to console
    const uri = message.paramsToQueryString(message.messageToURI(requestToken), {callback_type: 'post'})
    const qr =  transports.ui.getImageDataURI(uri)
    res.send({"qr": qr});
  })
}

credentialsController.ticketInfo = (req, res) => {
  ticketInfo = req.body;
}

credentialsController.getUsers = async (req, res) => {
  const getUser = await User.find();
  res.json(getUser);
}

credentialsController.getConcerts = async (req, res) => {
  const concerts = await Concert.find();
  res.json(concerts);
}

credentialsController.updateUser = async (req, res) => {
  infoValidation = req.body;
}

credentialsController.findUserByDID = async (req, res) => {
  const getUserbyDID = await User.findOne({did: req.params.did}).populate('concerts.concert');
  res.json(getUserbyDID.concerts);
}

credentialsController.getConcertbyId = async (req, res) => {
  const concert = await Concert.findById(req.params.idConcert);
  res.json(concert);
}

credentialsController.verifyCredentials = (req, res) => {
  const jwt = req.body.access_token
  console.log(jwt)
  console.log(decodeJWT(jwt))
  credentials.authenticateDisclosureResponse(jwt).then(async creds => {
    //validate specific data per use case
    console.log('CREDS')
    console.log(creds.did)
    const getUserbyDID = await User.findOne({did: creds.did}).populate('concerts.concert');
    if(getUserbyDID.concerts[0].validity === true) {
      socketHelper.emitNotification('ACCESS GRANTED');
    } else {
      socketHelper.emitNotification('ACCESS DENIED');
    }

    /*console.log('creds')
    console.log(creds)
    console.log('CREDS VERIFIED')
    console.log(creds.verified[0])*/
  }).catch( err => {
    console.log(err)
    console.log("oops")
  })
}

credentialsController.authCredentials = (req, res) => {
    console.log("AUTHENTICATION");
    const jwt = req.body.access_token;
    credentials.authenticateDisclosureResponse(jwt).then(async creds => {
      console.log('USUARIO PARA GUARDAR');
      console.log(creds);
      console.log('TICKET PARA GUARDAR');
      console.log(decodeJWT(jwt));
      
      const user = await User.find({did: creds.did});
      if(infoValidation != null) {
      invalidConcerts.length = 0;
      const oldOwner = await User.findOne({did: infoValidation.ownerDID}).populate('concerts.concert');
      const oldOwnerConcerts = oldOwner.concerts;
      for(var i = 0; i < oldOwnerConcerts.length;i++){
        invalidConcerts.push(oldOwnerConcerts[i]);
          if(oldOwnerConcerts[i].concert._id == infoValidation.concertID){
          oldOwnerConcerts[i].validity = false;
          //invalidConcerts.push(oldOwnerConcerts[i]);
        }
      }

      let userUpdated = await User.findOneAndUpdate({did: infoValidation.ownerDID}, {$set: {concerts: invalidConcerts}});
      }
      if(user.length == 0){
        const newUser = new User({
          did: creds.did,
          concerts: [{concert: ticketInfo.idConcert, validity: true}]
        });
        newUser.save(); 
      } else {
        const userUpdated = await User.findOneAndUpdate({did: user[0].did}, {$addToSet: {concerts: [{concert: ticketInfo.idConcert, validity: true}]}});
        res.json(userUpdated);
      }
        
      const push = transports.push.send(creds.pushToken, creds.boxPub);
    
      const concert = await Concert.findById(ticketInfo.idConcert);

      credentials.createVerification({
        sub: creds.did,
        exp: Math.floor(new Date().getTime() / 1000) + 30 * 24 * 60 * 60,
        claim: {'Concert' : {
          'Last Seen' : `${new Date()}`,
          'singer': concert.singer,
          'price': concert.price,
          'location': concert.location,
          'date': concert.date,
          'time': concert.time,
          'owner': creds.did
        }}
      }).then(attestation => {
        console.log('attestation');
      console.log(attestation);
        //console.log(`Encoded JWT sent to user: ${attestation}`)
        //console.log(`Decodeded JWT sent to user: ${JSON.stringify(decodeJWT(attestation))}`)
        console.log(decodeJWT(attestation))
        return push(attestation)  // *push* the notification to the user's uPort mobile app.
      }).then(res => {
        console.log(res)
        console.log('Push notification sent and should be recieved any moment...')
        console.log('Accept the push notification in the uPort mobile application')
      }).catch(res =>{

      })
    })
}

module.exports = credentialsController;