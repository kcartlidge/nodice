IOC = require("nodice");

// Fake module, used for illustrative purposes only.
var fakeModule1 = function () {
	return ' [Not Global] ';
};
var fakeModule2 = function () {
	return ' [Global] ';
};

// Register the example modules.
IOC.register('example', fakeModule1);
IOC.register('exampleGlobal', fakeModule2, true);

// Three different ways to resolve them.
exampleGlobal() + IOC.example() + IOC.resolve('example')();