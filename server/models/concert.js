const mongoose = require('mongoose');
const {Schema} = mongoose;

const ConcertSchema = new Schema({
    img: { type: String, required: true},
    singer: { type: String, required: true},
    price: { type: String, required: true},
    location: { type: String, required: true},
    date: { type: String, required: true},
    time: { type: String, required: true}
});

module.exports = mongoose.model('Concert', ConcertSchema);