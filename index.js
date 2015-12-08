var IOC;
var container = [];

IOC = {

	// Adds a registration for a module, under the name given.
	// You can use other objects, but modules are the intention.
	// If you registerGlobally then the module is available everywhere
	// with no further setup. Otherwise you'll find it as a property on
	// the IOC global object or returned via IOC.resolve (by name).
	register: function (name, module, registerGlobally) {
		registerGlobally = registerGlobally || false;

		// Short-circuit registering known-in-advance methods.
		if (name !== 'register' && name !== 'resolve' && name !== 'getRegistrations'
			&& typeof(container[name]) === 'undefined') {

			container[name] = module;
			IOC[name] = module;
			if (registerGlobally) {

				// Avoid naming clashes.
				if (global[name]) {
					throw "Cannot register '" + name + "' module globally (name conflict).";
				}
				global[name] = module;
			}
		}
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
