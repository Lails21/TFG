const mongoose = require('mongoose');
const {Schema} = mongoose;

const CredentialsSchema = new Schema({
    did: { type: String, required: true},
    privateKey: { type: String, required: true}
});

module.exports = mongoose.model('Credentials', CredentialsSchema);