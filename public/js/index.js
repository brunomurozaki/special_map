$(function(){
	init();
});


function init(){
	fillAbsoluteOrder();
	fillProportionalOrder();
	fillLastCreatedSquares();
	calculateTotalPainted();
}

function fillLastCreatedSquares(){
	$.getJSON("/squares?createdorder=DESC&limit=5", function(data){
		var select = $("#paintedSquares");
		for(var i = 0; i < data.length; i++){
			select.append($("<option>").append(data[i].idTerritory + " - " + data[i].createdAt))
		}
	});
}

function fillProportionalOrder(){
	$.getJSON("/territories?proportionalorder=DESC", function(data){
		var select = $("#proportional");
		for(var i = 0; i < data.length; i++){
			select.append($("<option>").append(data[i].name + " - " + data[i].prop))
		}
	});
}

function fillAbsoluteOrder(){
	$.getJSON("/territories?absoluteorder=DESC", function(data){
		var select = $("#absolute");
		for(var i = 0; i < data.length; i++){
			select.append($("<option>").append(data[i].name + " - " + data[i].counter))
		}
	});
}

function calculateTotalPainted(){
	$.getJSON("/territories?withpainted=true", function(data){
		data = data.data;
		var select = $("#total");
		var area = 0, painted = 0;

		for(var i = 0; i < data.length; i++){
			area += data[i].area;
			painted += data[i].painted_area;
		}

		select.append("Total painted area: " + (painted/area));
	});	
}