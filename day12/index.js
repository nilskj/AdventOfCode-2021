const readFile = require("../util/inputReader.js");

const input = readFile("input.txt").data.split("\n").filter(Boolean);

function makeCaveGraph(input) {
	const graph = {}
	for (const line of input) {
		const [u, v] = line.split("-");
		graph[u] = graph[u] || [];
		graph[v] = graph[v] || [];
		graph[u].push(v);
		graph[v].push(u);
	}
	return graph;
}

const caves = makeCaveGraph(input);

//depth first search in graph
const search = (cave, visited = new Set()) => {
	if (cave === "end") return 1;
	if (visited.has(cave) && cave.toLowerCase() === cave) return 0;
	let result = 0;
	visited.add(cave);

	for (const nextCave of caves[cave]) {
		result += search(nextCave, visited);
	}
	visited.delete(cave);

	return result;
}

//use object instead of set to keep track of visit counts
const search_visit_twice = (cave, visited = {}, doubleFlag = false) => {
	if (cave === "end") return 1;
	if (visited[cave] && cave.toLowerCase() === cave) {
		if (doubleFlag) {
			return 0;
		} else {
			doubleFlag = true
		}
	}

	let result = 0;
	visited[cave] = (visited[cave] + 1) || 1;

	for (const nextCave of caves[cave]) {
		if (nextCave !== 'start') { //prevent from revisiting start
			result += search_visit_twice(nextCave, visited, doubleFlag);
		}
	}

	--visited[cave];

	return result;
}

console.log(caves);
console.log("p1",search("start"));
console.log("p2",search_visit_twice("start"));
