const readFile = require("../util/inputReader.js");

const inputs = readFile("input.txt");

const numberPicks = inputs.readLine().split(",").map(num => parseInt(num))

const parseBoard = (data) => {
	data.readLine();
	let boardArray = [];
	for (let i = 0; i < 5; i++) {
		const line = data.readLine()?.trim().split(/ +/).map(num => parseInt(num) || 0);
		boardArray.push(line)
	}
	return boardArray;
};

let boards = []
while (inputs.current() < inputs.arr().length) {
	const b = parseBoard(inputs);
	if (typeof b[0] !== "undefined") {
		boards.push(Board(b));
	}
}


function Board(board) {
	function calculateScore() {
		let sum = 0;
		for (let y = 0; y < board.length; y++) {
			for (let x = 0; x < board[0].length; x++) {
				const m = board[y][x];
				sum += typeof m === "number" ? m : 0;
			}
		}
		return sum;
	}

	function allMarked(slots) {
		return slots.filter(n => typeof n !== "number").length === board.length
	}

	function checkWin(x, y) {
		const vertical = allMarked(board.map(row => row[x]));
		if (allMarked(board[y]) || vertical) {
			return calculateScore()
		}
		return false;
	}

	return Object.freeze({
		mark: (num) => {
			const y = board.findIndex(n => n.includes(num));
			if (y > -1) {

				const x = board[y].findIndex(n => n === num);
				board[y][x] = "x";
				const score = checkWin(x,y);
				return score * num
			}
			return false;
		}
	})
}

while (numberPicks.length) {
	const num = numberPicks.shift();
	for (let board of boards) {
		const win = board.mark(num);
		if (win) {
			const index = boards.findIndex(b => b === board);
			boards = boards.filter((b,i) => i !== index);
			console.log("winning calculation", win, index); //p1 is the first of the winning, p2 is the last
		}
	}
}
