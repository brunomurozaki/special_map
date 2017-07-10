$(function(){
	init();
});


function init(){
	$.getJSON("/territories?absoluteorder=DESC", function(data){
		var select = $("#absolute");
		for(var i = 0; i < data.length; i++){
			select.append($("<option>").append(data[i].name + " - " + data[i].counter))
		}
	});

	$.getJSON("/territories?proportionalorder=DESC", function(data){
		var select = $("#proportional");
		for(var i = 0; i < data.length; i++){
			select.append($("<option>").append(data[i].name + " - " + data[i].prop))
		}
	});

	$.getJSON("/squares?createdorder=true&limit=5", function(data){
		var select = $("#paintedSquares");
		for(var i = 0; i < data.length; i++){
			select.append($("<option>").append(data[i].idTerritory + " - " + data[i].createdAt))
		}
	});

}