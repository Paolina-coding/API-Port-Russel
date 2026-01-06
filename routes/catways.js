var express = require('express');
var router = express.Router();

const service = require('../services/catways');
const reservationService = require('../services/reservations');

router.post('/:catwayNumber/reservations/add', reservationService.add);
router.get('/:catwayNumber/reservations', reservationService.getList);
router.get('/:catwayNumber/reservations/:idReservation', reservationService.getById);
router.put('/:catwayNumber/reservations/:idReservation', reservationService.update);
router.delete('/:catwayNumber/reservations/:idReservation', reservationService.delete);

router.get('/', service.getList);
router.get('/:id', service.getById);
router.post('/add', service.add);
router.put('/:id', service.update);
router.delete('/:id', service.delete);

module.exports = router;