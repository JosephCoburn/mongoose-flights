const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    show,
    new: newFlight,
    create
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { title: 'All Flights', flights });
    }); 
}

function show(req, res) {
    Flight.findById(req.params.id)
    .populate('ticket')
    .exec(function(err, flight) {
        Ticket.find({_id: {$nin: flight.ticket}}, function(err, tickets) {
            console.log(tickets);
            res.render('flights/show', {
                title: 'Flight Detail', 
                flight,
                tickets
            });
        });
    });
}

function newFlight(req, res) {
    res.render('flights/new', { title: 'Add Flight' });
}

function create(req, res) {
    // convert onTime checkbox to a boolean
    req.body.onTime = !!req.body.onTime;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var flight = new Flight(req.body);
    flight.save(function(err) {
        // one way to handle errors in express
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect(`/flights/${flight._id}`);
    });
}