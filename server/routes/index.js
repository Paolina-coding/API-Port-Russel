var express = require('express');
var router = express.Router();

const userRoute = require('./users');
const catwayRoute = require('./catways');
const reservationRoute = require('./reservations');
const privateMiddleware = require('../middlewares/private');


router.post('/users/authenticate', require('../services/users').authenticate);

router.use('/users', privateMiddleware.checkJWT, userRoute);
router.use('/catways', privateMiddleware.checkJWT, catwayRoute);
router.use('/reservations', privateMiddleware.checkJWT, reservationRoute);


module.exports = router;
