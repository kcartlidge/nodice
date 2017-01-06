// Normally you would require the "nodice" npm module here.
var container = require("../lib/index.js");

// This is where all the dependencies are registered.
// As Node modules are effectively singletons, their dependencies are
// resolved as they are loaded. For this reason, registration order
// matters - when something is registered, it's dependencies should
// already have been registered ahead of it.

// This is first as it has no dependencies of it's own.
container.register("constants", require("./data/constants.js"));

// Next comes the repository as it only needs the constants to be registered.
container.register("permissionRepository", require("./data/permission-repository.js"));

// Then the service as it needs the constants and repository to already be registered.
container.register("permissionService", require("./business/permission-service.js"));

// Finally the UI as it requires the service.
container.register("ui", require("./presentation/console-ui.js"));

module.exports = container;
