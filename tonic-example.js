/*
 This example shows module registration and three ways you can then resolve them:
 1. Directly:
 permissionRepository.canAccessArea(personId, 'admin')
 2. Indirectly:
 haveAdminAccess = IOC.permissionService.canAccessAdmin(personId);
 3. By Resolving:
 IOC.resolve('constants').welcome
 */

// Only needed at the top level during module registration.
IOC = require("nodice");

// Fake module for message constants.
var constants = {
	welcome: "Welcome to the nodice example.",
	hasPermission: "You have permission.",
	forbidden: "You do not have permission."
};
// Fake module for the data store.
var permissionRepository = {
	canAccessArea: function (personId, area) {
		console.log("Checking the database.");
		return true;
	}
};
// Fake module for business services.
// This accesses the repository without a 'require'.
var permissionService = {
	canAccessAdmin: function (personId) {
		console.log("Checking the business service.");
		return permissionRepository.canAccessArea(personId, 'admin');
	}
};

// Register the example modules, including two as globals.
IOC.register('constants', constants, true);
IOC.register('permissionRepository', permissionRepository, true);
IOC.register('permissionService', permissionService);

// Use the modules (in another module, with no require statements).
console.log(IOC.resolve('constants').welcome);
var personId = 1;
var haveAdminAccess = IOC.permissionService.canAccessAdmin(personId);
console.log(haveAdminAccess ? constants.hasPermission : constants.forbidden);

// To stop Tonic logging 'undefined' at the end.
var result = true;
