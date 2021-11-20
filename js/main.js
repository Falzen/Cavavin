
$(document).ready(function() {
	init();
});



var CAVAVIN_SETTINGS = {
	tableId: 'cavavin',
	nbRows: 3,
	nbCols: 3
}


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
	applyBottles();
	document.getElementById('dateValue').valueAsDate = new Date(); 
}

function applyBottles() {
	let today = new Date();
	for (let i = 0; i < allBottles.length; i++) {
		let bottle = allBottles[i];
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






function doAddBottle() {
	let dateValue = $('input#dateValue').val();
	let name = $('input#name').val();
	let coords = $('input#coords').val();
	let periodicityInDays = $('input#periodicityInDays').val();
	let theDate = new Date(dateValue.split('-')[0], dateValue.split('-')[1], dateValue.split('-')[2]);
	console.log('theDate : ', theDate);
	let bottleData = {
		id: ++bottleIdCounter,
		name: name,
		coords: {
	    	y: coords.split('_')[0],
	    	x: coords.split('_')[1]
	    },
	    periodicityInDays: 1*periodicityInDays,
	    lastMovementDate: theDate,
	    // Rappel : Pour le dates, les mois sont numérotés de 0 à 11
		movements: [{
			dateValue: theDate,
			rotationDegrees: 0,
			temperatureCelcius: theDate
	    }]
	};

	allBottles.push(new Bottle(bottleData));

	applyBottles();
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