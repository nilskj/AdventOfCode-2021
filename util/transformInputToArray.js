const readFile = require("./inputReader.js");

function transformInputToArray(filename) {
	const inputs = readFile(filename);
	const data = []
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs.readLine();
		if (!input) break;
		data.push(input)
	}
	return data;
}

module.exports = transformInputToArray
