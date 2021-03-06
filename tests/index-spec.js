var jasmine = require('jasmine');
var expect = require('expect');
var assert = require('assert');

var IOC = require('../lib/index');

var stubProperty = "Hello world!";
var stubMessageProvider = { greeting: "Hello" };
var stubModule = {
	okay: true,
	testProperty: null,
	test: function (name, messageProvider) {
		return messageProvider.greeting + " " + name;
	}
};

describe("The NoDice IOC object", function () {
	it("should exist globally", function () {
		assert(typeof (IOC) !== 'undefined');
	});
	it("should have nothing registered in advance", function () {
		assert(IOC.getRegistrations().length == 0);
	});

	describe("with a registered module", function () {
		beforeEach(function () {
			IOC.register('messageProvider', stubMessageProvider);
			IOC.register('testProperty', stubProperty);
			IOC.register('testModule', stubModule);
		});

		it("should add that module to the list of registrations", function () {
			var registrations = IOC.getRegistrations();
			assert(registrations[2] === 'testModule');
		});
		it("should not have added a duplicate module (by name) to the registrations", function () {
			IOC.register('testModule', stubModule);
			var registrations = IOC.getRegistrations();
			assert(registrations.length === 3);
		});
		it("should be able to resolve the module", function () {
			var resolution = IOC.resolve('testModule');
			assert(typeof (resolution) === 'object');
		});
		it("should return the specific module requested", function () {
			assert(IOC.resolve('testModule').okay);
		});
		it("should fail to resolve an unknown module", function () {
			expect(function () { IOC.resolve('unknown') }).toThrow();
		});
		it("should inject dependencies into the module", function () {
			assert(IOC.resolve('testModule').test('Bob') === "Hello Bob");
		});
		it("should inject property dependencies into the module", function () {
			var prop = IOC.resolve('testModule').testProperty;
			assert(prop === "Hello world!");
		});
	});
});
