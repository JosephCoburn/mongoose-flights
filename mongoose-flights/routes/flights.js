var express = require('express');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');

// Get /flights 
router.get('/', flightsCtrl.index);
// GET /flights/new
router.get('/new', flightsCtrl.new);
router.post('/', flightsCtrl.create);

module.exports = router;
