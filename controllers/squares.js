const Territory = require('../server/models').Territory;
const Squares = require('../server/models').Squares;
const IncompleteData = require('../exceptions/incomplete_data');
const NotFound = require('../exceptions/not_found');
const ErrorLog = require('../server/log/LogError');

module.exports = {
  create(req, res) {
  	var x = req.params.x;
  	var y = req.params.y; 

  	return findTerritory(x, y, res);
  },
  list(req, res){
  	return prepareToListSquares(req.query, res);
  },
  retrieve(req, res) {
	var paramX = req.params.x;
  	var paramY = req.params.y; 

  	return Squares.findOne({
  		where: {
  			$and: [
  				{x: paramX},
  				{Y: paramY}
  			]
  		}
  	})
  	.then(data => res.status(201).send(formatCreateResponse(data)))
  	.catch(error => errorHandle(error, res))
  }
};

function prepareToListSquares(data, res){
	if(data.createdorder && data.limit){
		return Squares.findAll({
			limit: parseInt(data.limit),
			order: [["createdAt", data.createdorder]]
		}).then(data => res.status(200).send(data));	
	} else {
		return Squares.findAll().then(data => res.status(200).send(data));	
	}
}


function formatCreateResponse(data){
	return {
		data: {
			x: data.x,
			y: data.y,
			painted:true
		},
		error: false
	};
}

function findTerritory(x, y, res){
  	return Territory.findOne({
		where: { 
			$and: [
				{startx: { $lte: x }},
				{starty: { $lte: y }},
				{endx: { $gte: x }},
				{endy: { $gte: y }},
			]
		}
	})
	.then(data => createSquare(data, x, y, res))
	.catch(error => errorHandle(error, res));	
}

function createSquare(territory, x, y, res){
	if(territory == null){
		var notFound = new NotFound("There is no Territory at this position", 0);
		errorHandle(notFound, res);
		return;
	}

	return Squares
      .create({
      	idTerritory: territory.idTerritory,
        x: x,
        y: y
      })
      .then(squares => res.status(201).send(formatCreateResponse(squares)))
      .catch(error => errorHandle(error, res));
}

function errorHandle(error, res){
	console.log(error);
	ErrorLog(error);
	res.status(400).send(error)
}