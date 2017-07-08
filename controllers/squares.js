const Territory = require('../server/models').Territory;
const Squares = require('../server/models').Squares;
const IncompleteData = require('../exceptions/incomplete_data');

module.exports = {
  create(req, res) {
  	var x = req.params.x;
  	var y = req.params.y; 

  	return findTerritory(x, y, res);
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
  	.catch(error => errorHandle(error, x, y, res))
  }
};


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
				{startx: { $lt: x }},
				{starty: { $lt: y }},
				{endx: { $gt: x }},
				{endy: { $gt: y }},
			]
		}
	})
	.then(data => createSquare(data, x, y, res))
	.catch(error => errorHandle(error, x, y, res));	
}

function createSquare(territory, x, y, res){
	return Squares
      .create({
      	idTerritory: territory.idTerritory,
        x: x,
        y: y
      })
      .then(squares => res.status(201).send(formatCreateResponse(squares)))
      .catch(error => res.status(400).send(error));
}

function errorHandle(data, x, y, res){
	res.status(400).send(error)
}