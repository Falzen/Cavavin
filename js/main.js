
$(document).ready(function() {
	init();
});



var CAVAVIN_SETTINGS = {
	tableId: 'cavavin',
	nbRows: 3,
	nbCols: 3
}

var bottleIdCounter = 0;
var bottleDataList = [{
id: ++bottleIdCounter,
	name: 'Cubi de mousseux',
	coords: {
    	y: 1,
    	x: 1
    },
    periodicityInDays: 135,
    lastMovementDate: null,
    // Rappel : Pour le dates, les mois sont numérotés de 0 à 11
	movements: [{
		dateValue: new Date(2021, 10, 2, 20, 30, 0),
		rotationDegrees: 90,
		temperatureCelcius: 23
    },{
		dateValue: new Date(2019, 9, 17, 15, 30, 0),
		rotationDegrees: 90,
		temperatureCelcius: 24
    },{
		dateValue: new Date(2018, 8, 22, 8, 45, 0),
		rotationDegrees: 90,
		temperatureCelcius: 23
    }]
},{
	id: ++bottleIdCounter,
	name: 'Cubi de rouge',
	coords: {
    	y: 2,
    	x: 0
    },
    periodicityInDays: 150,
    lastMovementDate: null,
    // Rappel : Pour le dates, les mois sont numérotés de 0 à 11
	movements: [{
		dateValue: new Date(2021, 10, 13, 20, 30, 0),
		rotationDegrees: 90,
		temperatureCelcius: 23
    },{
		dateValue: new Date(2019, 7, 17, 15, 30, 0),
		rotationDegrees: 90,
		temperatureCelcius: 24
    },{
		dateValue: new Date(2018, 4, 22, 8, 45, 0),
		rotationDegrees: 90,
		temperatureCelcius: 23
    }]
},{
	id: ++bottleIdCounter,
	name: 'Cubi de rosé',
	coords: {
    	y: 2,
    	x: 1
    },
    periodicityInDays: 145,
    lastMovementDate: null,
    // Rappel : Pour le dates, les mois sont numérotés de 0 à 11
	movements: [{
		dateValue: new Date(2021, 8, 22, 15, 30, 0),
		rotationDegrees: 90,
		temperatureCelcius: 23
    },{
		dateValue: new Date(2019, 6, 17, 15, 30, 0),
		rotationDegrees: 90,
		temperatureCelcius: 24
    },{
		dateValue: new Date(2018, 4, 22, 8, 45, 0),
		rotationDegrees: 90,
		temperatureCelcius: 23
    }]
},{
	id: ++bottleIdCounter,
	name: 'Cubi de blanc',
	coords: {
    	y: 2,
    	x: 2
    },
    periodicityInDays: 165,
    lastMovementDate: null,
    // Rappel : Pour le dates, les mois sont numérotés de 0 à 11
	movements: [{
		dateValue: new Date(2021, 7, 10, 20, 30, 0),
		rotationDegrees: 90,
		temperatureCelcius: 23
    },{
		dateValue: new Date(2019, 5, 17, 15, 30, 0),
		rotationDegrees: 90,
		temperatureCelcius: 24
    },{
		dateValue: new Date(2018, 3, 22, 8, 45, 0),
		rotationDegrees: 90,
		temperatureCelcius: 23
    }]
}];

class Bottle {
    constructor(data) {
    	this.id = data.id;
        this.name = data.name;
        this.coords = data.coords;
        this.domId = data.coords.y + '_' + data.coords.x;
        this.movements = data.movements;
        this.periodicityInDays = data.periodicityInDays;
        this.lastMovementDate = data.movements.length != 0 ? data.movements[0].dateValue : null;
    }
}

var allBottles = [];

function init() {
	createGrid(CAVAVIN_SETTINGS);
	for (var i = 0; i < bottleDataList.length; i++) {
		allBottles.push(new Bottle(bottleDataList[i]));
	}
	console.log('allBottles : ', allBottles);
	applyBottles()
}

function applyBottles() {
	let today = new Date();
	console.log('today : ', today);
	for (let i = 0; i < allBottles.length; i++) {
		let bottle = allBottles[i];
		console.log('bottle : ', bottle);
		let nextRotationDate = addDays(bottle.lastMovementDate, bottle.periodicityInDays);
		let msBeforeNextRotation = nextRotationDate - today; // /1000/60/60/24
		let countdown = dhm(msBeforeNextRotation);
		makeCellDom(bottle, countdown);
	}
}

function makeCellDom(bottle, countdown) {
	let output = '<p class="name">' + bottle.name + '</p>';
	output += '<p class="countdown-days">' + countdown.days + ' days<br /><span class="countdown-hours">(and ' + countdown.hours + ' hours lol)</span></p>';
	output += '<button class="" data-bottleid="' + bottle.id + '" onclick="askRotation(' + bottle.id + ')">Rotate</button>';
	$('#' + bottle.domId).html(output);
}

function askRotation(bottleId) {
	let rotationData = {
		dateValue: new Date(),
		rotationDegrees: 90,
		temperatureCelcius: 23
	};
	doRotation(bottleId, rotationData);
}

function doRotation(bottleId, rotationData) {
	console.log('clicked bottleId : ', bottleId);
	for (let i = 0; i < allBottles.length; i++) {
		if(allBottles[i].id == bottleId) {
			allBottles[i].movements = [rotationData, ...allBottles[i].movements];
			allBottles[i].lastMovementDate = rotationData.dateValue;
		}
	}
	applyBottles();

}


function createGrid(settings) {
	let gridDom = '<table id="' + settings.tableId + '">';
	for (var i = 0; i < settings.nbRows; i++) {
		gridDom += '<tr>';
		for (var j = 0; j < settings.nbCols; j++) {
			gridDom += '<td>';
				gridDom += '<div class="cell-content" id="'+i+'_'+j+'">';
				gridDom += '</div>'; // data-coord="<row>_<col>"
			gridDom += '</td>';
		}
		gridDom += '</tr>';
	}
	$('#mainContainer').html(gridDom);
}



/* * * * * * * * * * * * * * * * * * * * * */

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  let result = {
  	days: d,
  	hours: pad(h),
  	minutes: pad(m)
  };
  return result;
}










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