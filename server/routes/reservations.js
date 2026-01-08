var express = require('express');
var router = express.Router();

const service = require('../services/AllReservations');

router.get('/', service.getAllReservations);
router.get('/current', service.getCurrentReservations);


module.exports = router;

