const fs = require('fs');
var path = require('path');

module.exports = function(error){
	var logsPath = '/../../public/logs';
	
	if(!fs.existsSync(__dirname + logsPath)){
		console.log("aaaa");
		fs.mkdirSync(path.join(__dirname + logsPath));
	}
	
	fs.appendFile(path.join(__dirname + logsPath +'/error.txt'), error + "\n", function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
}