var express = require('express');
var router = express.Router();
var squaresController = require('../controllers').squares;

router.patch('/:x/:y/paint', squaresController.create);
router.get('/:x/:y', squaresController.retrieve);

/*router.post('/', territoriesController.create);
router.get('/', territoriesController.list);
router.get('/:id', territoriesController.retrieve);
router.delete('/:id', territoriesController.destroy);*/

module.exports = router;