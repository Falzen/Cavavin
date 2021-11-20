
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