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
      .then(territory => res.status(201).send(formatResponse(territory)))
      .catch(error => res.status(400).send(error));
  },
};

function formatResponse(territory){
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