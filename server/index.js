const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes/routes.js')
const ngrok = require('ngrok');
const cors = require ('cors');
var socketIo = require('./socket_helper.js')

const { mongoose } = require('./database');

// Settings
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Origin","http://localhost:8100, https://localhost:8100, http://localhost:4200, https://localhost:4200, http://147.83.7.156:4200, https://147.83.7.156:4200, http://147.83.7.156:8100, https://147.83.7.156:8100");
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
  }
  next()
});

// Routes
app.use('/', router);

const server = app.listen(app.get('port'), () => {
    ngrok.connect(app.get('port')).then(ngrokUrl => {
        endpoint = ngrokUrl
      console.log(`Login Service running, open at ${endpoint}`)
    })
  })

  socketIo.setUp(server);

module.exports = app;


