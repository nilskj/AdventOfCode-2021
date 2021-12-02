const readFile = require("../util/inputReader.js")

const inputs = readFile("./input.txt");
const data = []
for (let i = 0; i < inputs.length; i++) {
	const input = inputs.readLine();
	if (!input) break;
	data.push(input)
}

/**
 * Submarine function with navigation commands implementation
 * @returns {Readonly<{getX: (function(): number), getDepth: (function(): number), forward: forward, up: (function(*): *), getXDepth: (function()), down: (function(*): *)}>}
 */
function Submarine() {
	let x = 0;
	let depth = 0;

	return Object.freeze({
		forward: (speed) => {
			x += speed;
		},
		up: (speed) => depth -= speed,
		down: (speed) => depth += speed,
		getX: () => x,
		getDepth: () => depth,
		getXDepth: () => x * depth,
	})
}

/**
 * Revised submarine with navigation commands implementation, also aim and ticking
 * @returns {Readonly<{getX: (function(): number), getDepth: (function(): number), forward: forward, up: (function(*): *), getXDepth: (function()), down: (function(*): *)}>}
 */
function SubmarineAim() {
	let x = 0;
	let depth = 0;
	let aim = 0;

	return Object.freeze({
		forward: (speed) => {
			x += speed;
			depth += aim * speed
		},
		up: (speed) => aim -= speed,
		down: (speed) => aim += speed,
		getX: () => x,
		getDepth: () => depth,
		getXDepth: () => x * depth
	})
}


function parseCommand(commandLine) {
	return {
		command: commandLine.split(" ")[0],
		value: parseInt(commandLine.split(" ")[1])
	}
}

/**
 * Controller that can calculate a navigation route result ahead
 * @param commands
 * @returns {Readonly<{controlResult: *}>}
 * @constructor
 */
function SubmarineController(commands, submarine) {
	const sub = submarine();

	for (let command of commands) {
		const {command: com, value} = parseCommand(command);
		switch (com) {
			case "forward":
				sub.forward(value);
				break;
			case "up":
				sub.up(value);
				break;
			case "down":
				sub.down(value);
				break;
		}
	}

	return Object.freeze({
		controlResult: () => sub.getXDepth()
	})
}

module.exports = {
	Submarine,
	SubmarineAim,
	SubmarineController,
	data
}
