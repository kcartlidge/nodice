IOC = require('../index.js');

console.log("This is a very short, contrived example.\nCheck the 'example' subfolder.\n");

// Register without adding to the global object.
// These will be accessed via either IOC.whatever or IOC.resolve('whatever').
IOC.register('constants', require('./constants.js'), true);
IOC.register('permissionService', require('./permission-service.js'));

// Register whilst adding to the global object.
// This can be accessed as if *already* injected directly. Do not place
// it into your function signature; it just works. If you try to use a
// classically injected parameter, it will break.
IOC.register('permissionRepository', require('./permission-repository.js'), true);

// Not registered globally, so use the IOC global instance.
var personId = 9;
console.log(IOC.permissionService.canAccessAdmin(personId));
console.log();