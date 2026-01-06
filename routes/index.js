var express = require('express');
var router = express.Router();

const userRoute = require('./users');
var catwayRoute = require('./catways');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoute);
router.use('/catways', catwayRoute);

module.exports = router;
