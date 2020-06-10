const mongoose = require('mongoose');

const URI_DB = 'mongodb://localhost/digital-identity';

mongoose.connect(URI_DB)
.then (db => console.log('DB connected'))
.catch(err => console.error(err));

module.exports = mongoose;