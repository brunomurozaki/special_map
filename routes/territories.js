var express = require('express');
var router = express.Router();
var territoriesController = require('../controllers').territories;

router.post('/', territoriesController.create);

module.exports = router;