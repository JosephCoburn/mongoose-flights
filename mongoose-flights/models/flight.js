const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    arrival: Date,
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    }
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Southwest', 'United'],
    },
    flightNo: {
        type: Number, 
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date, 
        default: Date.now() + 366*24*60*60000
    },
    passengers: [String],
    onTime: {
        type: Boolean, 
        default: false 
    }, 
    destinations: [destinationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);