IOC = require('../lib/index.js');

console.log("This is a very short, contrived example.");
console.log("Check the 'example' subfolder.");
console.log();

// The permissionService is the entry point for this example.
// It is required separately so can be both registered and used normally.
var permissionService = require('./permission-service.js');

// Register things that either are or use dependencies (order matters).
// The first two are just required in, as they are not needed outside of the DI.
IOC.register('constants', require('./constants.js'));
IOC.register('permissionRepository', require('./permission-repository.js'));
IOC.register('permissionService', permissionService);

// Run the examples using the injected stuff.
// They are set up so IDs < 10 have access and 10+ don't.
console.log(permissionService.canAccessAdmin(9));
console.log(permissionService.canAccessAdmin(10));
console.log();
