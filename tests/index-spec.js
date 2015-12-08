var assert = require('assert');
var IOC = require('../index');

var stubModule = {};
var stubGlobalModule = { hello: 'world' };

describe("The NoDice IOC object", function () {
	it("should exist globally", function () {
		assert(typeof(IOC) !== 'undefined');
	});
	it("should have nothing registered in advance", function () {
		assert(IOC.getRegistrations().length == 0);
	});

	describe("with a registered module", function(){
		beforeEach(function(){
			IOC.register('testModule', stubModule, false);
			IOC.register('testGlobalModule', stubGlobalModule, true);
		});

		it("should add that module to the list of registrations", function () {
			var registrations = IOC.getRegistrations();
			assert(registrations[0] === 'testModule');
		});
		it("should not have added a duplicate module (by name) to the registrations", function () {
			IOC.register('testGlobalModule', stubGlobalModule, true);
			var registrations = IOC.getRegistrations();
			assert(registrations.length === 2);
		});
		it("should add that module to the IOC object", function () {
			assert(typeof(IOC.testModule) === 'object');
		});
		it("should be able to resolve the module", function () {
			var resolution = IOC.resolve('testModule');
			assert(typeof(resolution) === 'object');
		});
		it("should not have made a non-global module globally available", function () {
			assert(typeof(testModule) === 'undefined');
		});
		it("should have made a global module globally available", function () {
			assert(typeof(testGlobalModule) === 'object');
		});
		it("should return the specific module requested", function () {
			assert(testGlobalModule.hello === 'world');
		});
	});
});