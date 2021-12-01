const {is} = require("../util/assert.js");
const {data, numTimesDepthIncreases, numTimesDepthWindowIncreases} = require("./index");

is(numTimesDepthIncreases([32,42,10,20]), 2)
is(numTimesDepthIncreases([0]), 0)
is(numTimesDepthIncreases([200,100,0]), 0)
console.log("numTimesDepthIncreases", numTimesDepthIncreases(data));


/* example:
	 199  A
	 200  A B
	 208  A B C
	 210    B C D
	 200  E   C D
	 207  E F   D
	 240  E F G
	 269    F G H
	 260      G H
	 263        H

		 expected 5 increases: B E F G H
		 */
const testData = [199,200,208,210,200,207,240,269,260,263]
is(numTimesDepthWindowIncreases(testData), 5)
console.log("numTimesDepthWindowIncreases", numTimesDepthWindowIncreases(data));

