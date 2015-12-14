var _ = require('lodash');
var argsList = require('args-list');
var IOC;
var container = [];

IOC = {

	// Adds a registration for a module, under the name given.
	// You can use other objects, but modules are the intention.
	register: function (name, module) {
		container[name] = module;

		var hasInjections = false;
		_.each(Object.keys(module), function (keyName) {
			var thing = module[keyName];
			if (typeof (thing) === 'function') {
				var args = argsList(thing);
				var substitutions = [];
				var idx = 0;
				_.each(args, function (arg) {
					var resolution = container[arg];
					if (resolution) {
						substitutions[idx] = arg;
						hasInjections = true;
					}
					idx += 1;
				});

				if (hasInjections) {
					module[keyName] = function () {
						var args = [];
						for (var idx = 0; idx < substitutions.length; idx++){
							if (substitutions[idx]) {
								args[idx] = IOC.resolve(substitutions[idx]);
							} else {
								args[idx] = arguments[idx];
							}
						}
						return thing.apply(module, args);
					};
				}
			}
		});

		return container[name];
	},

	// Return the module if registered.
	// Missing modules throw errors rather than return undefined as they should
	// be treated as hard errors that absolutely need fixing.
	resolve: function (name) {
		var resolution = container[name];
		if (!resolution) {
			throw "Cannot resolve '" + name + "' module.";
		}
		return resolution;
	},

	// Get a list of known registrations (names only).
	// This is deliberately not the original by ref to ensure that it cannot be
	// changed directly and so become out of sync.
	getRegistrations: function () {
		var result = [];
		for (var item in container) {
			result.push(item);
		}
		return result;
	}
};

module.exports = IOC;
