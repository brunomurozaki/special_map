var express = require('express');
var router = express.Router();
var IncompleteData = require('../exceptions/incomplete_data');

router.post('/', function(req, res, next) {
  var requestBody = req.body;
  verifyTerritoryData(requestBody);
  res.send(200);
});

function verifyTerritoryData(data){
	if(!data["name"] || !data["start"] || !data["end"])
		throw new IncompleteData("Territory data is incomplete", 0);
}

module.exports = router;