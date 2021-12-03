const {is} = require("../util/assert.js");
const {calculatePowerConsumption, data, calculateLifeSupportRating} = require("./index");

const mock = [
	'00100', '11110',
	'10110', '10111',
	'10101', '01111',
	'00111', '11100',
	'10000', '11001',
	'00010', '01010'
]

const power = calculatePowerConsumption(mock);
is(power,198)

const powerData = calculatePowerConsumption(data);
console.log("power part 1",powerData);

const lifeSupport = calculateLifeSupportRating(mock);
is(lifeSupport, 230);

const lifeSupportData = calculateLifeSupportRating(data);
console.log(lifeSupportData);
