const readFile = require("../util/inputReader.js");

const inputs = readFile("input.txt");
const rows = inputs.data.split("\n").filter(Boolean);

let matches = new Map()
matches.set("(", ")");
matches.set("[", "]");
matches.set("{", "}");
matches.set("<", ">");

let errorScoreMap = new Map()
errorScoreMap.set(")", 3);
errorScoreMap.set("]", 57);
errorScoreMap.set("}", 1197);
errorScoreMap.set(">", 25137);

let completeScore = new Map()
completeScore.set(")", 1);
completeScore.set("]", 2);
completeScore.set("}", 3);
completeScore.set(">", 4);

function parse_line(line) {
	let parsed = [];
	for (const char of line) {
		if (matches.has(char)) {
			parsed.push(matches.get(char));
		} else if (parsed.length === 0 || char !== parsed[parsed.length - 1]) {
			return [char];
		} else {
			parsed.pop();
		}
	}
	return ["", parsed]
}

const errors = rows.map(parse_line).filter(res => Boolean(res[0])).map(d => d[0]);
const score = errors.reduce((acc, curr) => acc + errorScoreMap.get(curr), 0);
console.log("p1", score);



const incomplete = rows.map(parse_line).filter(res => !Boolean(res[0]))
let autoCompleteScores = incomplete.map((line) => auto_complete(line[1]));
autoCompleteScores.sort((a, b) => a-b)
console.log("p2", autoCompleteScores[Math.floor(autoCompleteScores.length/2)])

function auto_complete(chars) {
	let score = 0;
	while (chars.length) {
		score = score * 5 + (completeScore.get(chars.pop()) || 0);
	}
	return score;
}
