var express = require('express');
var router = express.Router();

const service = require('../services/catways');

router.get('/', service.getList);
router.get('/:id', service.getById);
router.post('/add', service.add);
router.put(':/id', service.update);
router.delete('/:id', service.delete);

module.exports = router;