const readFile = require("../util/inputReader.js");
const {range} = require("../util/range");
const inputs = readFile("input.txt");

const crab_mock = [16,1,2,0,4,2,7,1,2,14]
//let crabs = crab_mock
let crabs = inputs.data.split(",").map(num => parseInt(num));

const candidates = range(Math.min(...crabs), Math.max(...crabs));
const candidate_distances = candidates.map(cd => crabs
	.map(c => Math.abs(c - cd))
	.reduce((acc,curr) => acc + curr, 0));
const candidate_fuels = candidates.map((cd) => crabs
	.map((c, i) => {
		const distance = Math.abs(c - cd);
		return (distance * (distance+1))/2;
	})
	.reduce((acc,curr) => acc + curr, 0));

console.log(
	Math.min(...candidate_distances),
	Math.min(...candidate_fuels)
);
