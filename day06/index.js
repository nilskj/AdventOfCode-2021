const readFile = require("../util/inputReader.js");
const rotate = require("../util/rotate");

const inputs = readFile("input.txt");

const mockFish =  [3,4,3,1,2]//[3,4,3,1,2];
//let fishes = mockFish
let fishes = inputs.data.split(",").map(num => parseInt(num));

function tick(lanternFish) {
	for (let i=0;i<lanternFish.length;i++) {
		lanternFish[i] --;
		if(lanternFish[i] < 0) {
			lanternFish.push(9);
			lanternFish[i] = 6
		}
	}
}

function tick_two(lanternFish, iterations) {
	const fishCount = Array.from(Array(9), () => 0);
	lanternFish.forEach(fish => {
		fishCount[fish] ++;
	})
	for (let i = 0; i < iterations; i++) {
		fishCount[7] += fishCount[0]
		rotate(fishCount);
	}
	return fishCount.reduce((acc, curr) => acc + curr, 0)
}

console.log(tick_two(fishes, 80));
console.log(tick_two(fishes, 256));


