var Ticket = require('../models/ticket');
var Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    addToTickets
};

function addToTickets(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.ticket.push(req.body.ticketId);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

function create(req, res) {
    Ticket.create(req.body, function(err, ticket) {
        res.redirect('/tickets/new');
    });
}

function newTicket(req, res) {
    Ticket.find({}, function(err, tickets) {
        res.render('tickets/new', {
            title: 'Add Ticket',
            tickets
        });
    });
}