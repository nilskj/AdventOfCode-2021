const readFile = require("../util/inputReader.js");

const inputs = readFile("input.txt");
const rows = inputs.data.split("\n").filter(r => r);

//make grid;
const grid_width = rows[0].length
const grid_height = rows.length
let grid = Array.from(Array(grid_height), () => Array(grid_width));
for (let y = 0; y < grid_height; y++) {
	for (let x = 0; x < grid_width; x++) {
		grid[y][x] = rows[y][x]
	}
}

function get_height(grid, y, x) {
	if (y < 0 || x < 0 || y > grid_height - 1 || x > grid_width - 1)
		return Infinity;
	return grid[y][x]
}

let lows = new Set();

for (let y = 0; y < grid_height; y++) {
	for (let x = 0; x < grid_width; x++) {
		const height = grid[y][x];
		const up = get_height(grid, y - 1, x);
		const down = get_height(grid, y + 1, x);
		const left = get_height(grid, y, x - 1);
		const right = get_height(grid, y, x + 1);
		if (height < up && height < down && height < left && height < right) {
			lows.add([y, x]);
		}
	}
}

//p1
let points = 0;
for (const low of lows) {
	points += parseInt(grid[low[0]][low[1]]) + 1;
}
console.log("p1", points, lows);



//p2
/*function setHas(set, check) {
	for (const setElement of set) {
		if (setElement.length === check.length && setElement.every((e, i) => {
			return e == check[i];
		})) {
			return true;
		}
	}
	return false;
}*/

function flood_fill(i, j, map) {
	if (map[i][j] === 1) return 0;
	map[i][j] = 1;

	let size = 1;
	if (i - 1 >= 0) {
		size += flood_fill(i - 1, j, map);
	}
	if (i + 1 < map.length) {
		size += flood_fill(i + 1, j, map);
	}
	if (j - 1 >= 0) {
		size += flood_fill(i, j - 1, map);
	}
	if (j + 1 < map[i].length) {
		size += flood_fill(i, j + 1, map);
	}
	return size;
}

let grid_2 = Array.from(Array(grid_height), () => Array(grid_width));
for (let y = 0; y < grid_height; y++) {
	for (let x = 0; x < grid_width; x++) {
		grid_2[y][x] = rows[y][x] === "9" ? 1 : 0
	}
}

let bassins = [];
for (let i = 0; i < rows.length; i++) {
	const line = rows[i];
	for (let j = 0; j < line.length; j++) {
		const size = flood_fill(i, j, grid_2);
		if (size > 0) {
			bassins.push(size);
		}
	}
}
bassins.sort((a, b) => b - a);
console.log("p2", bassins[0] * bassins[1] * bassins[2]);



