const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            flights
        });
    }); 
};

function create(req, res) {
    // convert onTime checkbox to a boolean
    req.body.onTime = !!req.body.onTime;
    // remove extra whitespace next to commas
    req.body.passengers = req.body.passengers.replace(/\s*,\s*/g, ',');
    // split if passengers is not empty string
    if (req.body.passengers) req.body.passengers = req.body.passengers.split(',');
    var flight = new Flight(req.body);
    flight.save(function(err) {
        // one way to handle errors in express
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights/new');
    });
}

function newFlight(req, res) {

    res.render('flights/new');
}