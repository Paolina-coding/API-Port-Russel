var express = require('express');
var router = express.Router();

const service = require('../services/users');

router.get('/', service.getList); 
router.get('/:email', service.getByEmail); 
router.post('/add', service.add);
router.put('/:email', service.update); 
router.delete('/:email', service.delete); 


module.exports = router;
