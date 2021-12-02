const {is} = require("../util/assert.js");
const {SubmarineController, Submarine, data, SubmarineAim} = require("./index");

//Submarine navigation tests
const submarine = Submarine();
submarine.forward(3);
submarine.down(3);
submarine.up(1);
is(submarine.getX(), 3);
is(submarine.getDepth(), 2);
is(submarine.getXDepth(), 3 * 2);

//part 1 test
const testData = ["forward 4", "down 2", "up 1"]
const controller = SubmarineController(testData, Submarine);
is(controller.controlResult(),4)

//part 2 test
const testData2 = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]
const controllerAim = SubmarineController(testData2, SubmarineAim);
is(controllerAim.controlResult(), 900);

console.log("submarine:",SubmarineController(data, Submarine).controlResult())
console.log("with aim:",SubmarineController(data, SubmarineAim).controlResult())
