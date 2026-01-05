var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoute);
router.use('/reservations', reservationRoute);
router.use('/catways', catwayRoute);

module.exports = router;
