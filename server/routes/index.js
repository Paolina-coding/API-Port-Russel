var express = require('express');
var router = express.Router();

const userRoute = require('./users');
var catwayRoute = require('./catways');



router.use('/users', userRoute);
router.use('/catways', catwayRoute);

module.exports = router;
