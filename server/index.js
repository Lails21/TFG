const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes/routes.js')
const ngrok = require('ngrok');
const cors = require ('cors');

const { mongoose } = require('./database');

// Settings
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: '*'}));

// Routes
app.use('/', router);

const server = app.listen(app.get('port'), () => {
    ngrok.connect(app.get('port')).then(ngrokUrl => {
        endpoint = ngrokUrl
      console.log(`Login Service running, open at ${endpoint}`)
    })
  })
