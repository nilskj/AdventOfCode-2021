/**
 * simply rotate array one step
 * @param arr
 * @param reverse
 * @returns {*}
 */
function rotate(arr, reverse = false) {
	if (reverse)
		arr.unshift(arr.pop())
	else
		arr.push(arr.shift())
	return arr;
}

module.exports = rotate
