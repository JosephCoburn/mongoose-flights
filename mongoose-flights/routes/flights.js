var express = require('express');
var router = express.Router();
flightsCtrl = require('./controllers/flights');

/* GET users listing. */
router.get('/new', flightsCtrl.new);

module.exports = router;
