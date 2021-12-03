const transformInputToArray = require("../util/transformInputToArray");

const data = transformInputToArray("input.txt");

/**
 * Reads binary signals and calculate power consumption
 * @param data
 * @returns {number}
 */
function calculatePowerConsumption(data) {
	let positionSum = 0;

	let gamma = ""
	let epsilon = ""

	for (let i = 0; i < data[0].length; i++) {
		positionSum = 0;
		for (let x = 1; x < data.length; x++) {
			positionSum += parseInt(data[x].charAt(i));
		}
		if (positionSum >= data.length / 2) {
			gamma += "1";
			epsilon += "0";
		} else {
			gamma += "0";
			epsilon += "1";
		}
	}
	return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

/**
 * Filter out a array with a bit filter, check if has most zeros and ones untill one left
 * @param data
 * @param b
 * @returns {number}
 */
function calculateBitFilter(data, b) {
	for(let i=0; data.length > 1; i++) {
		let zeros = 0;
		let ones = 0;
		for(let input of data) {
			if (input.charAt(i) === '1') {
				ones ++;
			} else {
				zeros ++;
			}
		}
		const filterTarget = b ?
			(zeros > ones ? "0" : "1") : (ones < zeros ? "1" : "0");
		data = data.filter(input => input.charAt(i) === filterTarget);
	}
	return parseInt(data[0], 2);
}

/**
 * Calculate life support rating (oxygen times CO2 scrubber ratings product)
 * @param data
 * @param most
 * @returns {number}
 */
function calculateLifeSupportRating(data) {
	const ox = calculateBitFilter(data, true);
	const co2 = calculateBitFilter(data, false);
	return ox*co2;
}

module.exports = {
	calculatePowerConsumption,
	calculateLifeSupportRating,
	data
}
