const fs = require('fs');

/**
 * Reads a file and provides some convenient functions for the data
 * @param filename
 * @returns {Readonly<{arr: (function(): string[]), current: (function(): string), goto: goto, data: string, length: (number|null), readLine: (function())}>}
 */
function readFile(filename) {
	let currentLine = 0;
	let data = fs.readFileSync(filename,
		{encoding: 'utf8', flag: 'r'});
	const inputString = data.split('\n');

	return Object.freeze({
		data,
		readLine: () => inputString[currentLine++] || undefined,
		goto: (index) => {
			currentLine = index
		},
		current: () => inputString[currentLine],
		arr: () => inputString,
		length: inputString.length || null
	})
}

module.exports = readFile
