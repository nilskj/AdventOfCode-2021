const transformInputToArray = require("../util/transformInputToArray");

const data = transformInputToArray("input.txt");

/**
 * 1. Count the number of times a depth measurement increases from the previous measurement. (There is no measurement before the first measurement
 * O(n) time, 0(1) space
 * @param inputs
 * @returns {number}
 */
function numTimesDepthIncreases(inputs) {
	let numIncreases = 0;
	for (let i = 1; i < inputs.length; i++) {
		if (parseInt(inputs[i - 1]) < parseInt(inputs[i]))
			numIncreases++;
	}
	return numIncreases;
}

/**
 * 2. Count the number of times a "depth window" measurement sum increases
 * O(n) time, 0(1) space
 * @param inputs
 * @param windowSize
 * @returns {number}
 */
function numTimesDepthWindowIncreases(inputs, windowSize = 3) {
	let numIncreases = 0;
	for (let i = 0; i < inputs.length-windowSize+1; i++) {
		const startOfFirstWindow = inputs[i]
		const endOfSecondWindow = inputs[i+windowSize];
		if (parseInt(endOfSecondWindow) > parseInt(startOfFirstWindow)) {
			numIncreases ++;
		}
	}
	return numIncreases;
}

module.exports = {
	data,
	numTimesDepthIncreases,
	numTimesDepthWindowIncreases
};
