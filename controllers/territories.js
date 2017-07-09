const Territory = require('../server/models').Territory;
const Squares = require('../server/models').Squares;
const IncompleteData = require('../exceptions/incomplete_data');
const TerritoryOverlay = require('../exceptions/territory_overlay');

module.exports = {
  create(req, res) {
  	return prepareToInsertTerritory(req.body, res);
  },
  list(req, res) {
  	return prepareToListTerritory(req.query, res);
  },
  retrieve(req, res) {
	  return prepareToRetrieveTerritory(req.params, req.query, res);
  },
  destroy(req, res) {
	  return Territory
	    .findById(req.params.id)
	    .then(territory => {
	      if (!territory) {
	        return res.status(400).send({
	          message: 'Territory Not Found',
	        });
	      }
	      return territory
	        .destroy()
	        .then(() => res.status(204).send(formatDestroyResponse()))
	        .catch(error => res.status(400).send(error));
	    })
	    .catch(error => res.status(400).send(error));
  }
};

function prepareToListTerritory(data, res){
	return Territory
	  .findAll({
	  	include: [{model: Squares, as: 'squares', attributes: ['x', 'y']}]
	  })
	  .then(territory => res.status(200).send(formatListResponse(territory, data)))
	  .catch(error => res.status(400).send(error));
}

function prepareToRetrieveTerritory(data, query, res){
	return Territory
	    .findOne({
	    	where: {idTerritory: data.id},
	    	include: [{model: Squares, as: 'squares', attributes: ['x', 'y']}]
	    })
	    .then(territory => getTerritoryData(territory, data, query, res))
	    .catch(error => errorHandle(error, res));
}

function getTerritoryData(territory, data, query, res){
	if (!territory) {
		return res.status(404).send({
		  message: 'Territory Not Found',
		});
	}

	res.status(200).send(formatRetrieveResponse(territory, data, query));
}

function formatRetrieveResponse(territory, data, query){
	var withSquares = query.withpainted == "true";

	var obj = {
		name: territory.name,
		start: { x: territory.startx, y: territory.starty },
		end: { x: territory.endx, y: territory.endy },
		//area: data[i].getArea() ha um getter no model territory mas por algum motivo ele trava a execucao do server. Nao consegui encontrar o motivo
		area: calculateArea(territory),
		painted_area: territory.squares.length
	};

	if(withSquares)
		obj.squares = territory.squares;

	return obj
}

function formatDestroyResponse(){
	return {error:false};
}

function formatListResponse(territory, data){
	console.log("here");
	var retData = [];
	var withSquares = data.withpainted == "true";

	console.log(data);

	for(var i = 0; i < territory.length; i++){
		retData[i] = {
			name: territory[i].name,
			start: { x: territory[i].startx, y: territory[i].starty },
			end: { x: territory[i].endx, y: territory[i].endy },
			//area: data[i].getArea() ha um getter no model territory mas por algum motivo ele trava a execucao do server. Nao consegui encontrar o motivo
			area: calculateArea(territory[i]),
			painted_area: territory[i].squares.length
		}

		if(withSquares)
			retData[i].squares = territory[i].squares;
	}

	return {
		count: territory.length,
		data: retData
	}
}

function formatCreateResponse(territory){
	return { 
      	name: territory.name,
      	start: { x: territory.startx, y: territory.starty },
      	end: { x: territory.endx, y: territory.endy }
    }
}

function tryInsertTerritory(data, res){
	var sx = data.start.x,
	sy = data.start.y,
	ex = data.end.x,
	ey = data.end.y;

  	return Territory.findOne({
		where: { 
			$or: [
				{
					$and: [
						{startx: { $lte: sx }},
						{starty: { $lte: sy }},
						{endx: { $gte: sx }},
						{endy: { $gte: sy }}		
					]
				},
				{
					$and: [
						{startx: { $lte: ex }},
						{starty: { $lte: ey }},
						{endx: { $gte: ex }},
						{endy: { $gte: ey }}		
					]
				} 
			]
		}
	})
	.then(tdata => insertTerritory(tdata, data, res))
	.catch(error => errorHandle(error, res));	
}

function insertTerritory(tdata, data, res){
	if(tdata == null){
		console.log("free to go");
		return Territory
	      .create({
	        name: data.name,
	        startx: data.start.x,
	        starty: data.start.y,
	        endx: data.end.x,
	        endy: data.end.y
	      })
	      .then(territory => res.status(201).send(formatCreateResponse(territory)))
	      .catch(error => errorHandle(error, res));	
	} else {
		throw new TerritoryOverlay("Territory position is overlaying another territory", 0);
	}
}

function errorHandle(error, res){
	console.log(error);
	res.status(400).send(error);
}

function prepareToInsertTerritory(data, res){
	if(!data["name"] || !data["start"] || !data["end"])
		throw new IncompleteData("Territory data is incomplete", 0);

	return tryInsertTerritory(data, res);
}

function calculateArea(territory){
	var modx = territory.endx - territory.startx;
    var mody = territory.endy - territory.starty;
    return modx * mody;
}