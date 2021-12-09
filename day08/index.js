const readFile = require("../util/inputReader.js");
const {range} = require("../util/range");

const inputs = readFile("input.txt");

const lines = inputs.data.split(" ").flatMap(i => i.split("\n"));

const knownDigits = new Map([[2, 1], [4, 4], [3, 7], [7, 8]])
const numLines = inputs.length;
const decodeSignals = []
const outputDigits = [];

function includesIn(arr, subarr) {
	for (const letter of [...subarr]) {
		if (![...arr].includes(letter)) {
			return false;
		}
	}
	return true;
}

function matchScrambled(value, compare) {
	if (value.length !== compare.length)
		return false;
	if (value === compare)
		return true;
	const val_sorted = [...value].sort().join("");
	const comp_sorted = [...compare].sort().join("");
	return val_sorted === comp_sorted
}

function getOutputSum(decodeSignals, outputDigit) {

	//fill map with known digits (these have unique lengths)
	const decodeMap = new Map();
	for (const decodeSignal of decodeSignals) {
		if (knownDigits.has(decodeSignal.length)) {
			decodeMap.set(knownDigits.get(decodeSignal.length), decodeSignal)
		}
	}

	//find others by deduction
	const candidates5 = decodeSignals.filter(s => s.length === 5);
	const candidates6 = decodeSignals.filter(s => s.length === 6);
	const [right1, right2] = decodeMap.get(1);
	const [three] = candidates5.filter(candidate => candidate.includes(right1) && candidate.includes(right2))
	const [nine] = candidates6.filter(candidate => includesIn(candidate, three))
	const [five] = candidates5.filter(candidate => candidate !== three && includesIn(nine, candidate));
	const [two] = candidates5.filter(c => c !== three && c !== five);
	const [six] = candidates6.filter(candidate => candidate !== nine && includesIn(candidate, five));
	const [zero] = candidates6.filter(c => c !== six && c !== nine);

	decodeMap.set(0, zero);
	decodeMap.set(2, two);
	decodeMap.set(3, three);
	decodeMap.set(5, five);
	decodeMap.set(6, six);
	decodeMap.set(9, nine);

	let sum = "";

	for (const digit of outputDigit) {
		for (let [key, value] of decodeMap.entries()) {
			if (matchScrambled(value, digit)) {
				sum += key.toString();
			}
		}
	}
	return parseInt(sum)
}

//p1
/*const known = new Map([[2, 1], [4, 4], [3, 7], [7, 8]])
let numKnown = 0;
const allOutputDigits = outputDigits.flat(1);
for (const digit of allOutputDigits) {
	if (known.has(digit.length)) {
		numKnown++;
	}
}
console.log(numKnown);*/

//p2
let total = 0;
for (let i = 0; i < numLines - 1; i++) {
	decodeSignals.push(lines.slice(i * 15, 10 + i * 15));
	outputDigits.push(lines.slice(11 + i * 15, 15 + i * 15));
	total += getOutputSum(decodeSignals[i], outputDigits[i]);
}

console.log(total)
