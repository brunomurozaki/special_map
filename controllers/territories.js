const Territory = require('../server/models').Territory;
const IncompleteData = require('../exceptions/incomplete_data');


module.exports = {
  create(req, res) {
  	verifyTerritoryData(req.body);
  	return Territory
      .create({
        name: req.body.name,
        startx: req.body.start.x,
        starty: req.body.start.y,
        endx: req.body.end.x,
        endy: req.body.end.y
      })
      .then(territory => res.status(201).send(formatCreateResponse(territory)))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
	return Territory
	  .all()
	  .then(data => res.status(200).send(formatListResponse(data)))
	  .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
	  return Territory
	    .findById(req.params.id)
	    .then(territory => {
	      if (!territory) {
	        return res.status(404).send({
	          message: 'Territory Not Found',
	        });
	      }
	      return res.status(200).send(formatRetrieveResponse(territory));
	    })
	    .catch(error => res.status(400).send(error));
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

function formatRetrieveResponse(data){
	return {
		name: data.name,
		start: { x: data.startx, y: data.starty },
		end: { x: data.endx, y: data.endy },
		//area: data[i].getArea() ha um getter no model territory mas por algum motivo ele trava a execucao do server. Nao consegui encontrar o motivo
		area: calculateArea(data)
	};
}

function formatDestroyResponse(){
	return {error:false};
}

function formatListResponse(data){
	var retData = [];

	for(var i = 0; i < data.length; i++){

		retData[retData.length] = {
			name: data[i].name,
			start: { x: data[i].startx, y: data[i].starty },
			end: { x: data[i].endx, y: data[i].endy },
			//area: data[i].getArea() ha um getter no model territory mas por algum motivo ele trava a execucao do server. Nao consegui encontrar o motivo
			area: calculateArea(data[i])
		}
	}

	return {
		count: data.length,
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

function verifyTerritoryData(data){
	if(!data["name"] || !data["start"] || !data["end"])
		throw new IncompleteData("Territory data is incomplete", 0);
}

function calculateArea(territory){
	var modx = territory.endx - territory.startx;
    var mody = territory.endy - territory.starty;
    return modx * mody;
}