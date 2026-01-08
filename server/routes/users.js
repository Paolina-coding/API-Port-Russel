var express = require('express');
var router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

router.get('/', service.getList); //private.checkJWT, 
router.get('/:email', service.getByEmail); //private.checkJWT, 
router.post('/add', service.add);
router.put('/:email', service.update); //, private.checkJWT
router.delete('/:email', service.delete); //private.checkJWT, 
router.post('/authenticate', service.authenticate);

module.exports = router;
