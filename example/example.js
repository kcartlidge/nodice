IOC = require('../index.js');

console.log("This is a very short, contrived example.");
console.log("Check the 'example' subfolder.");
console.log();

// Register. The order is important, due to dependencies.
IOC.register('constants', require('./constants.js'));
IOC.register('permissionRepository', require('./permission-repository.js'));
IOC.register('permissionService', require('./permission-service.js'));

var main = IOC.resolve('permissionService');

console.log(main.canAccessAdmin(9));
console.log(main.canAccessAdmin(10));
console.log();
