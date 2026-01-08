var express = require('express');
var router = express.Router();

const userRoute = require('./users');
const catwayRoute = require('./catways');
const reservationRoute = require('./reservations');
const private = require('../middlewares/private');


router.post('/users/authenticate', require('../services/users').authenticate);

router.use('/users', private.checkJWT, userRoute);
router.use('/catways', private.checkJWT, catwayRoute);
router.use('/reservations', private.checkJWT, reservationRoute);


module.exports = router;
