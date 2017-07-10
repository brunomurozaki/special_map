var express = require('express');
var router = express.Router();
var squaresController = require('../controllers').squares;

router.patch('/:x/:y/paint', squaresController.create);
router.get('/:x/:y', squaresController.retrieve);
router.get('/', squaresController.list);

module.exports = router;