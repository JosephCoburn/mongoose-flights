const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: String,
    flightNo: Number,
    departs: Date,
    passengers: [String],
    onTime: Boolean
});

module.exports = mongoose.model('Flight', flightSchema);