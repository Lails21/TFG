const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    did: { type: String, required: true},
    concerts: [{
        type: Schema.ObjectId,
        ref: 'Concert'
    }]
});

module.exports = mongoose.model('User', UserSchema);