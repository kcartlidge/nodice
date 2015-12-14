var assert = require('assert');
var IOC = require('../index');

var stubModule = { hello: 'world' };

describe("The NoDice IOC object", function () {
	it("should exist globally", function () {
		assert(typeof(IOC) !== 'undefined');
	});
	it("should have nothing registered in advance", function () {
		assert(IOC.getRegistrations().length == 0);
	});

	describe("with a registered module", function(){
		beforeEach(function(){
			IOC.register('testModule', stubModule);
		});

		it("should add that module to the list of registrations", function () {
			var registrations = IOC.getRegistrations();
			assert(registrations[0] === 'testModule');
		});
		it("should not have added a duplicate module (by name) to the registrations", function () {
			IOC.register('testModule', stubModule);
			var registrations = IOC.getRegistrations();
			assert(registrations.length === 1);
		});
		it("should be able to resolve the module", function () {
			var resolution = IOC.resolve('testModule');
			assert(typeof(resolution) === 'object');
		});
		it("should return the specific module requested", function () {
			assert(IOC.resolve('testModule').hello === 'world');
		});
	});
});