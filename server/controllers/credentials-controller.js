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

const User = require('../models/user');
const Concert = require('../models/concert');

const credentialsController = {};
var ticketInfo;
var infoStore;
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

credentialsController.findUserByDID = async (req, res) => {
  const getUserbyDID = await User.findOne({did: req.params.did}).populate('concerts').select({concerts: 1});
  res.json(getUserbyDID);
}

credentialsController.getConcertbyId = async (req, res) => {
  console.log(req.params.idConcert)
  const concert = await Concert.findById(req.params.idConcert);
  res.json(concert);
}

credentialsController.authCredentials = (req, res) => {
    console.log("AUTHENTICATION");
    const jwt = req.body.access_token
    credentials.authenticateDisclosureResponse(jwt).then(async creds => {
      console.log('USUARIO PARA GUARDAR');
      console.log(creds.did);
      console.log('TICKET PARA GUARDAR');
      console.log(ticketInfo);
      
      const user = await User.find({did: creds.did});
      console.log(user);
      if(user.length == 0){
        const newUser = new User({
          did: creds.did,
          concerts: [ticketInfo.idConcert]
        });
        newUser.save(); 
      } else {
        console.log("ELSEE")
        const userUpdated = await User.findOneAndUpdate({did: user[0].did}, {$addToSet: {concerts: ticketInfo.idConcert}});
        res.json(userUpdated);
      }
        

      const push = transports.push.send(creds.pushToken, creds.boxPub);
    
      const concert = await Concert.findById(ticketInfo.idConcert);
      console.log(concert)

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