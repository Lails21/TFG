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

const credentialsController = {};
var ticketInfo;
const providerConfig = { rpcUrl: 'https://rinkeby.infura.io/ethr-did'}
const ethrDidResolver = getResolver(providerConfig)

/*let DidReg = Contract(DidRegistryContract)
DidReg.setProvider(providerConfig)
let didReg = DidReg.deployed()
console.log('didReg');
console.log(didReg);*/


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

credentialsController.authCredentials = (req, res) => {
    console.log("AUTHENTICATION");

    const jwt = req.body.access_token
    credentials.authenticateDisclosureResponse(jwt).then(creds => {
      console.log('JWT CODED');
      console.log(jwt);
      console.log('JWT DECODED');
      console.log(decodeJWT(jwt))
      console.log('CREDS');
      console.log(creds);
      console.log('PUSH TOKEN DECODED');
      console.log(decodeJWT(creds.pushToken))

    const push = transports.push.send(creds.pushToken, creds.boxPub);
      
      credentials.createVerification({
        sub: creds.did,
        exp: Math.floor(new Date().getTime() / 1000) + 30 * 24 * 60 * 60,
        claim: {'Concert' : {
          'Last Seen' : `${new Date()}`,
          'singer': ticketInfo.singer,
          'price': ticketInfo.price,
          'location': ticketInfo.location,
          'date': ticketInfo.date,
          'time': ticketInfo.time,
          'owner': creds.did
        }}
      }).then(attestation => {
        console.log('attestation');
      console.log(attestation);
        console.log(`Encoded JWT sent to user: ${attestation}`)
        console.log(`Decodeded JWT sent to user: ${JSON.stringify(decodeJWT(attestation))}`)
        return push(attestation)  // *push* the notification to the user's uPort mobile app.
      }).then(res => {
        console.log(res)
        console.log('Push notification sent and should be recieved any moment...')
        console.log('Accept the push notification in the uPort mobile application')
      })
    })
}

module.exports = credentialsController;