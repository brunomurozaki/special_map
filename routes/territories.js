var express = require('express');
var router = express.Router();
var territoriesController = require('../controllers').territories;

router.post('/', territoriesController.create);
router.get('/', territoriesController.list);
router.get('/:id', territoriesController.retrieve);
router.delete('/:id', territoriesController.destroy);

module.exports = router;