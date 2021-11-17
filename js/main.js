
$(document).ready(function() {
	init();
});



var CAVAVIN_SETTINGS = {
	tableId: 'cavavin',
	nbRows: 3,
	nbCols: 3
}

var bottleData = {
	name: 'Cubi de mousseux',
	coords: {
    	y: 1,
    	x: 1
    },
    periodicityInDays: 3.5*10,
    lastMovementDate: null,
    // Rappel : Pour le dates, les mois sont numérotés de 0 à 11
	movements: [{
		dateValue: new Date(2020, 6, 12),
		rotationDegrees: 90,
		temperatureCelcius: 23
    },{
		dateValue: new Date(2019, 9, 17),
		rotationDegrees: 90,
		temperatureCelcius: 24
    },{
		dateValue: new Date(2018, 8, 22),
		rotationDegrees: 90,
		temperatureCelcius: 23
    }]
}


class Bottle {
    constructor(data) {
        this.name = data.name;
        this.coords = data.coords;
        this.domId = data.coords.y + '_' + data.coords.x;
        this.movements = data.movements;
        this.lastMovementDate = data.movements.length != 0 ? data.movements[0].dateValue : null;
    }
}

var allBottles = [];

function init() {
	createGrid(CAVAVIN_SETTINGS);
	let oneBottle = new Bottle(bottleData);
	allBottles.push(oneBottle);
	console.log('oneBottle : ', oneBottle);

	console.log('oneBottle.lastMovementDate : ', oneBottle.lastMovementDate);
	console.log(allBottles);
	applyBottles()
}

function applyBottles() {
	for (let i = 0; i < allBottles.length; i++) {
		let bottle = allBottles[i];
	console.log('bottle : ', bottle.lastMovementDate.years());
		let nextRotationDate = bottle.lastMovementDate.addDays(bottle.periodicityInDays);
		console.log('nextRotationDate : ', nextRotationDate);
		//$('#' + bottle.domId)
	}
}

function createGrid(settings) {
	let gridDom = '<table id="' + settings.tableId + '">';
	for (var i = 0; i < settings.nbRows; i++) {
		gridDom += '<tr>';
		for (var j = 0; j < settings.nbCols; j++) {
			gridDom += '<td>';
				gridDom += '<div class="cell-content" id="'+i+'_'+j+'"></div>'; // data-coord="<row>_<col>"
			gridDom += '</td>';
		}
		gridDom += '</tr>';
	}
	$('#mainContainer').html(gridDom);
}



/* * * * * * * * * * * * * * * * * * * * * */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeMapByAttrFromList(list, attrName) {
	if(!attrName) {
		attrName = 'name';
	}
	let tempMap = new Map();
	for (var i = 0; i < list.length; i++) {
		let elem = list[i];
		if(tempMap.get(elem[attrName]) != null) {
			let tempList = tempMap.get(elem[attrName]);
			tempList.push(elem);
			tempMap.set(elem[attrName], tempList);
		} else {
			tempMap.set(elem[attrName], [elem]);
		}
	}
	return tempMap;
}