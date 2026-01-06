var express = require('express');
var router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

router.get('/', private.checkJWT, service.getList);
router.get('/:email', private.checkJWT, service.getByEmail);
router.post('/add', service.add);
router.put('/:email', private.checkJWT, service.update);
router.delete('/:email', private.checkJWT, service.delete);
router.post('/authenticate', service.authenticate);

module.exports = router;
