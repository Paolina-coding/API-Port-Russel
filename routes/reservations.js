var express = require('express');
var router = express.Router();

const service = require('../services/reservations');

router.get('/', service.getList);
router.get('/:idReservation', service.getById);
router.post('/add', service.add);
router.put(':/idReservation', service.update);
router.delete('/:idReservation', service.delete);

module.exports = router;