const readFile = require("../util/inputReader.js");

const inputs = readFile("input.txt");
const rows = inputs.data.split("\n").filter(Boolean);
const grid_width = rows[0].length
const grid_height = rows.length
let grid = Array.from(Array(grid_height), () => Array(grid_width));
for (let y = 0; y < grid_height; y++) {
	for (let x = 0; x < grid_width; x++) {
		grid[y][x] = parseInt(rows[y][x])
	}
}

function step_check_flash(grid, y, x, hasFlashed) {
	if (y < 0 || x < 0 || y >= grid_height || x >= grid_width)
		return;

	if (hasFlashed.get(`${y}${x}`)) {
		grid[y][x] = 0;
		return;
	}

	grid[y][x]++;
	if (grid[y][x] >= 10) {
		grid[y][x] = 0;
		hasFlashed.set(`${y}${x}`, true);
		step_check_flash(grid, y - 1, x - 1, hasFlashed);
		step_check_flash(grid, y - 1, x, hasFlashed);
		step_check_flash(grid, y - 1, x + 1, hasFlashed);
		step_check_flash(grid, y, x - 1, hasFlashed);
		step_check_flash(grid, y, x + 1, hasFlashed);
		step_check_flash(grid, y + 1, x + 1, hasFlashed);
		step_check_flash(grid, y + 1, x, hasFlashed);
		step_check_flash(grid, y + 1, x - 1, hasFlashed);
	}
}

function step(grid) {
	let hasFlashed = new Map();
	for (let y = 0; y < grid_height; y++) {
		for (let x = 0; x < grid_width; x++) {
			step_check_flash(grid, y, x, hasFlashed);
		}
	}
	return hasFlashed;
}

//p1
/*let numFlashes = 0;
for (let i = 0; i < 100; i++) {
	const flashed = step(grid);
	numFlashes += flashed.size;
}
console.table(grid);
console.log(numFlashes);
*/

//p2
let flashed = 0;
let iteration = 1;
while(flashed.size !== grid_height*grid_width) {
	flashed = step(grid).size;
	if (flashed === grid_height*grid_width) {
		console.log(iteration);
		break;
	}
	iteration ++;
}

