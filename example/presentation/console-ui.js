// A sample presentation layer.
// This is often a collection of REST API endpoints for example.
var consoleUI = {

	showAdminAccessDetails: function (userId, permissionService) {
		console.log(permissionService.canAccessAdmin(userId));
	}

};

module.exports = consoleUI;
