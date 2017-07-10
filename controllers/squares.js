const Territory = require('../server/models').Territory;
const Squares = require('../server/models').Squares;
const IncompleteData = require('../exceptions/incomplete_data');
const NotFound = require('../exceptions/not_found');
const ErrorLog = require('../server/log/LogError');


module.exports = {
  create(req, res) {
  	return prepareToCreateSquare(req.params, res);
  },
  list(req, res){
  	return prepareToListSquares(req.query, res);
  },
  retrieve(req, res) {
  	return prepareToRetrieveSquare(req.params, res);
  }
};

function prepareToRetrieveSquare(params, res){
	return Territory.findOne({
		where: { 
			$and: [
				{startx: { $lte: params.x }},
				{starty: { $lte: params.y }},
				{endx: { $gte: params.x }},
				{endy: { $gte: params.y }},
			]
		}
	})
	.then(data => retrieveSquare(data, params, res))
	.catch(error => errorHandle(error, res));
}

function retrieveSquare(territory, params, res){
	if(!territory){
		var notFound = new NotFound("There is no Territory at this position", 0);
		errorHandle(notFound, res);
		return;
	}

	return Squares.findOne({
  		where: {
  			$and: [
  				{x: params.x},
  				{Y: params.y}
  			]
  		}
  	})
  	.then(data => res.status(201).send(formatCreateResponse(data, params)))
  	.catch(error => errorHandle(error, res))

} 

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

function formatCreateResponse(data, params){
	var painted = false;

	if(data)
		painted = true;

	return {
		data: {
			x: params.x,
			y: params.y,
			painted:painted
		},
		error: false
	};
}

function prepareToCreateSquare(params, res){
  	return Territory.findOne({
		where: { 
			$and: [
				{startx: { $lte: params.x }},
				{starty: { $lte: params.y }},
				{endx: { $gte: params.x }},
				{endy: { $gte: params.y }},
			]
		}
	})
	.then(data => createSquare(data, params, res))
	.catch(error => errorHandle(error, res));	
}

function createSquare(territory, params, res){
	if(territory == null){
		var notFound = new NotFound("There is no Territory at this position", 0);
		errorHandle(notFound, res);
		return;
	}

	return Squares
      .create({
      	idTerritory: territory.idTerritory,
        x: params.x,
        y: params.y
      })
      .then(squares => res.status(201).send(formatCreateResponse(squares, params)))
      .catch(error => errorHandle(error, res));
}

function errorHandle(error, res){
	console.log(error);
	ErrorLog(error);
	res.status(400).send(error)
}