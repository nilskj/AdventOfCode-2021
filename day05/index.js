const readFile = require("../util/inputReader.js");
const {smart_range} = require("../util/range");
const zip = require("../util/zip");

const inputs = readFile("input.txt");

const MAP_SIZE = 1000;
let map = Array.from(Array(MAP_SIZE), () => new Array(MAP_SIZE));
for (let i = 0; i < MAP_SIZE; i++) {
	for (let ii = 0; ii < MAP_SIZE; ii++) {
		map[i][ii] = 0;
	}
}

const lines = inputs.data.trim().split("\n")
	.map(line => line.split("->").flatMap(pos => pos.trim().split(",")))
	.map(line => parse_line(...line))

function parse_line(...args) {
	return [...args].map(a => parseInt(a))
}

let dangers = 0;

function addCell(y, x) {
	map[y][x]++;
	if (map[y][x] === 2)
		dangers++;
}

for (const line of lines) {
	const [x, y, xx, yy] = line;

	const isDiagonal = Math.abs(xx - x) === Math.abs(yy - y);
	const axial = (x === xx || y === yy);

	const xRange = smart_range(x, xx);
	const yRange = smart_range(y, yy);

	if (axial) {
		for (let i of xRange) {
			for (let ii of yRange) {
				addCell(ii,i)
			}
		}
	}

	if (isDiagonal) {
		zip([xRange, yRange]).forEach(point => {
			addCell(point[1],point[0]);
		})
	}
}

//console.table(map) // used for visual test of mock data
console.log(dangers);
