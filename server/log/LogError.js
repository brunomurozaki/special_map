const fs = require('fs');
var path = require('path');

module.exports = function(error){
	fs.appendFile(path.join(__dirname + '/../../public/logs/error.txt'), error + "\n", function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
}