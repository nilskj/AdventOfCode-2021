/**
 * Works like pythons range, with 3rd step argument
 * @param start
 * @param stop
 * @param step
 * @returns {*[]}
 */
function range(start, stop, step) {
	if (typeof stop == 'undefined') {
		stop = start;
		start = 0;
	}
	if (typeof step == 'undefined') {
		step = 1;
	}
	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		return [];
	}
	const result = [];
	for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
		result.push(i);
	}
	return result;
}

/**
 * Smart range function that handles negatives etc
 * @param a
 * @param b
 * @returns {*[]}
 */
function smart_range(a,b) {
	return a > b ? range(a, b-1, -1) : range(a, b+1)
}

module.exports = {
	range,
	smart_range
}
