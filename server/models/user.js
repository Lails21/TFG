const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    did: { type: String, required: true},
    concerts: [{
        concert: {type: Schema.ObjectId, ref: 'Concert'},
        validity: {type: Boolean, required: true}
    }]
});

module.exports = mongoose.model('User', UserSchema);